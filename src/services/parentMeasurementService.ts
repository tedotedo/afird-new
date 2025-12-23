/**
 * Service for managing parent measurements
 */

import { createClient } from '@/lib/supabase/client';
import type {
  ParentMeasurement,
  CreateParentMeasurementInput,
  UpdateParentMeasurementInput,
} from '@/types/parent';

/**
 * Get all measurements for the current user
 */
export async function getParentMeasurements(): Promise<ParentMeasurement[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('parent_measurements')
    .select('*')
    .order('measurement_date', { ascending: false });

  if (error) {
    console.error('Error fetching parent measurements:', error);
    throw new Error(`Failed to fetch measurements: ${error.message}`);
  }

  return data || [];
}

/**
 * Get the most recent measurement for the current user
 */
export async function getLatestParentMeasurement(): Promise<ParentMeasurement | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('parent_measurements')
    .select('*')
    .order('measurement_date', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned
      return null;
    }
    console.error('Error fetching latest parent measurement:', error);
    throw new Error(`Failed to fetch latest measurement: ${error.message}`);
  }

  return data;
}

/**
 * Get a specific measurement by ID
 */
export async function getParentMeasurementById(
  id: string
): Promise<ParentMeasurement | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('parent_measurements')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching parent measurement:', error);
    throw new Error(`Failed to fetch measurement: ${error.message}`);
  }

  return data;
}

/**
 * Create a new parent measurement
 */
export async function createParentMeasurement(
  input: CreateParentMeasurementInput
): Promise<ParentMeasurement> {
  const supabase = createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('parent_measurements')
    .insert({
      user_id: user.id,
      ...input,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating parent measurement:', error);
    throw new Error(`Failed to create measurement: ${error.message}`);
  }

  return data;
}

/**
 * Update an existing parent measurement
 */
export async function updateParentMeasurement(
  id: string,
  input: UpdateParentMeasurementInput
): Promise<ParentMeasurement> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('parent_measurements')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating parent measurement:', error);
    throw new Error(`Failed to update measurement: ${error.message}`);
  }

  return data;
}

/**
 * Delete a parent measurement
 */
export async function deleteParentMeasurement(id: string): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase
    .from('parent_measurements')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting parent measurement:', error);
    throw new Error(`Failed to delete measurement: ${error.message}`);
  }
}

/**
 * Get measurement history within a date range
 */
export async function getParentMeasurementHistory(
  startDate: string,
  endDate: string
): Promise<ParentMeasurement[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('parent_measurements')
    .select('*')
    .gte('measurement_date', startDate)
    .lte('measurement_date', endDate)
    .order('measurement_date', { ascending: false });

  if (error) {
    console.error('Error fetching parent measurement history:', error);
    throw new Error(`Failed to fetch measurement history: ${error.message}`);
  }

  return data || [];
}


