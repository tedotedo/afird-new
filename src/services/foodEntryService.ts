import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { NutritionalData } from '@/types/nutrition';
import { calculateDailyTotals } from '@/utils/nutritionCalculations';

export interface FoodEntry {
  id: string;
  user_id: string;
  child_id: string | null;
  image_url: string;
  image_storage_path: string;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack' | null;
  date_time: string;
  nutritional_data: NutritionalData;
  created_at: string;
  updated_at: string;
}

export interface CreateFoodEntryInput {
  imageUrl: string;
  imageStoragePath: string;
  mealType?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  dateTime: Date;
  nutritionalData: NutritionalData;
  childId?: string;
}

/**
 * Save a new food entry
 */
export async function saveFoodEntry(input: CreateFoodEntryInput): Promise<FoodEntry> {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('food_entries')
    .insert({
      user_id: user.id,
      child_id: input.childId || null,
      image_url: input.imageUrl,
      image_storage_path: input.imageStoragePath,
      meal_type: input.mealType || null,
      date_time: input.dateTime.toISOString(),
      nutritional_data: input.nutritionalData,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to save food entry: ${error.message}`);
  }

  return data as FoodEntry;
}

/**
 * Get food entries for the current user
 */
export async function getFoodEntries(options?: {
  startDate?: Date;
  endDate?: Date;
  mealType?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  limit?: number;
  childId?: string;
}): Promise<FoodEntry[]> {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  let query = supabase
    .from('food_entries')
    .select('*')
    .eq('user_id', user.id)
    .order('date_time', { ascending: false });

  if (options?.startDate) {
    query = query.gte('date_time', options.startDate.toISOString());
  }

  if (options?.endDate) {
    query = query.lte('date_time', options.endDate.toISOString());
  }

  if (options?.mealType) {
    query = query.eq('meal_type', options.mealType);
  }

  if (options?.childId) {
    query = query.eq('child_id', options.childId);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch food entries: ${error.message}`);
  }

  return (data || []) as FoodEntry[];
}

/**
 * Get a single food entry by ID
 */
export async function getFoodEntryById(entryId: string): Promise<FoodEntry | null> {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('food_entries')
    .select('*')
    .eq('id', entryId)
    .eq('user_id', user.id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Not found
    }
    throw new Error(`Failed to fetch food entry: ${error.message}`);
  }

  return data as FoodEntry;
}

/**
 * Delete a food entry
 */
export async function deleteFoodEntry(entryId: string): Promise<void> {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { error } = await supabase
    .from('food_entries')
    .delete()
    .eq('id', entryId)
    .eq('user_id', user.id);

  if (error) {
    throw new Error(`Failed to delete food entry: ${error.message}`);
  }
}

/**
 * Get daily summary for a specific date
 */
export async function getDailySummary(targetDate: Date): Promise<{
  date: string;
  totalEntries: number;
  totals: NutritionalData;
  entries: FoodEntry[];
}> {
  const entries = await getFoodEntries({
    startDate: new Date(targetDate.setHours(0, 0, 0, 0)),
    endDate: new Date(targetDate.setHours(23, 59, 59, 999)),
  });

  const totals = calculateDailyTotals(entries);

  return {
    date: targetDate.toISOString().split('T')[0],
    totalEntries: entries.length,
    totals,
    entries,
  };
}

/**
 * Get all entries for a user (admin function - uses service role)
 */
export async function getAllUserEntries(userId: string): Promise<FoodEntry[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('food_entries')
    .select('*')
    .eq('user_id', userId)
    .order('date_time', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch entries: ${error.message}`);
  }

  return (data || []) as FoodEntry[];
}

