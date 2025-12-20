import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// GET - Fetch food milestones for the authenticated user
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const childId = searchParams.get('childId');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const successLevel = searchParams.get('successLevel');

  let query = supabase
    .from('food_milestones')
    .select('*')
    .eq('user_id', user.id)
    .order('date_tried', { ascending: false });

  // Filter by child if specified (null for parent)
  if (childId) {
    query = query.eq('child_id', childId);
  }

  // Filter by date range if specified
  if (startDate) {
    query = query.gte('date_tried', startDate);
  }
  if (endDate) {
    query = query.lte('date_tried', endDate);
  }

  // Filter by success level if specified
  if (successLevel) {
    query = query.eq('success_level', successLevel);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching food milestones:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST - Create a new food milestone
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const {
    child_id,
    food_name,
    food_category,
    date_tried,
    attempt_number,
    success_level,
    texture,
    temperature,
    notes,
    photo_url,
    food_entry_id,
  } = body;

  if (!food_name || !date_tried || !success_level) {
    return NextResponse.json(
      { error: 'Missing required fields: food_name, date_tried, success_level' },
      { status: 400 }
    );
  }

  // Check if this food already exists for this person, increment attempt number
  const { data: existingMilestones } = await supabase
    .from('food_milestones')
    .select('attempt_number')
    .eq('user_id', user.id)
    .eq('food_name', food_name)
    .order('attempt_number', { ascending: false })
    .limit(1);

  const nextAttemptNumber = existingMilestones && existingMilestones.length > 0
    ? (existingMilestones[0].attempt_number || 0) + 1
    : 1;

  const { data, error } = await supabase
    .from('food_milestones')
    .insert({
      user_id: user.id,
      child_id: child_id || null,
      food_name,
      food_category: food_category || null,
      date_tried,
      attempt_number: attempt_number || nextAttemptNumber,
      success_level,
      texture: texture || null,
      temperature: temperature || null,
      notes: notes || null,
      photo_url: photo_url || null,
      food_entry_id: food_entry_id || null,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating food milestone:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

