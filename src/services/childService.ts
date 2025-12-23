import { createClient } from '@/lib/supabase/server';
import { 
  Child, 
  ChildMeasurement, 
  CreateChildInput, 
  UpdateChildInput,
  CreateMeasurementInput,
  ChildWithLatestMeasurement
} from '@/types/child';

/**
 * Create a new child profile
 */
export async function createChild(input: CreateChildInput): Promise<Child> {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  // Insert child
  const { data: child, error: childError} = await supabase
    .from('children')
    .insert({
      user_id: user.id,
      name: input.name,
      date_of_birth: input.dateOfBirth.toISOString().split('T')[0],
      sex: input.sex,
      parental_consent_given: input.parentalConsentGiven || false,
      parental_consent_timestamp: input.parentalConsentGiven ? new Date().toISOString() : null,
      parental_consent_ip: input.parentalConsentIp || null,
    })
    .select()
    .single();

  if (childError) {
    throw new Error(`Failed to create child: ${childError.message}`);
  }

  // If initial measurements provided, add them
  if (input.initialHeight && input.initialWeight) {
    await createMeasurement({
      childId: child.id,
      heightCm: input.initialHeight,
      weightKg: input.initialWeight,
      measurementDate: new Date(),
    });
  }

  return child as Child;
}

/**
 * Get all children for the current user
 */
export async function getChildren(): Promise<Child[]> {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('children')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch children: ${error.message}`);
  }

  return (data || []) as Child[];
}

/**
 * Get children with their latest measurements
 */
export async function getChildrenWithLatestMeasurements(): Promise<ChildWithLatestMeasurement[]> {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  const children = await getChildren();
  
  // Fetch latest measurement for each child
  const childrenWithMeasurements = await Promise.all(
    children.map(async (child) => {
      const { data: measurements } = await supabase
        .from('child_measurements')
        .select('*')
        .eq('child_id', child.id)
        .order('measurement_date', { ascending: false })
        .limit(1);

      return {
        ...child,
        latestMeasurement: measurements?.[0] as ChildMeasurement | undefined,
      };
    })
  );

  return childrenWithMeasurements;
}

/**
 * Get a single child by ID
 */
export async function getChildById(childId: string): Promise<Child | null> {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('children')
    .select('*')
    .eq('id', childId)
    .eq('user_id', user.id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Not found
    }
    throw new Error(`Failed to fetch child: ${error.message}`);
  }

  return data as Child;
}

/**
 * Update a child profile
 */
export async function updateChild(childId: string, input: UpdateChildInput): Promise<Child> {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  const updateData: any = {};
  if (input.name !== undefined) updateData.name = input.name;
  if (input.sex !== undefined) updateData.sex = input.sex;
  if (input.dateOfBirth !== undefined) {
    updateData.date_of_birth = input.dateOfBirth.toISOString().split('T')[0];
  }

  const { data, error } = await supabase
    .from('children')
    .update(updateData)
    .eq('id', childId)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update child: ${error.message}`);
  }

  return data as Child;
}

/**
 * Delete a child profile
 */
export async function deleteChild(childId: string): Promise<void> {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { error } = await supabase
    .from('children')
    .delete()
    .eq('id', childId)
    .eq('user_id', user.id);

  if (error) {
    throw new Error(`Failed to delete child: ${error.message}`);
  }
}

/**
 * Create a new measurement for a child
 */
export async function createMeasurement(input: CreateMeasurementInput): Promise<ChildMeasurement> {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  // Verify child belongs to user
  const child = await getChildById(input.childId);
  if (!child) {
    throw new Error('Child not found or access denied');
  }

  const { data, error } = await supabase
    .from('child_measurements')
    .insert({
      child_id: input.childId,
      height_cm: input.heightCm,
      weight_kg: input.weightKg,
      measurement_date: input.measurementDate.toISOString().split('T')[0],
      notes: input.notes || null,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create measurement: ${error.message}`);
  }

  return data as ChildMeasurement;
}

/**
 * Get all measurements for a child
 */
export async function getChildMeasurements(childId: string): Promise<ChildMeasurement[]> {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  // Verify child belongs to user
  const child = await getChildById(childId);
  if (!child) {
    throw new Error('Child not found or access denied');
  }

  const { data, error } = await supabase
    .from('child_measurements')
    .select('*')
    .eq('child_id', childId)
    .order('measurement_date', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch measurements: ${error.message}`);
  }

  return (data || []) as ChildMeasurement[];
}

/**
 * Delete a measurement
 */
export async function deleteMeasurement(measurementId: string): Promise<void> {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  // Verify measurement belongs to user's child
  const { data: measurement } = await supabase
    .from('child_measurements')
    .select('child_id')
    .eq('id', measurementId)
    .single();

  if (measurement) {
    const child = await getChildById(measurement.child_id);
    if (!child) {
      throw new Error('Access denied');
    }
  }

  const { error } = await supabase
    .from('child_measurements')
    .delete()
    .eq('id', measurementId);

  if (error) {
    throw new Error(`Failed to delete measurement: ${error.message}`);
  }
}


