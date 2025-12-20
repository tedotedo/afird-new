import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// GET - Fetch nutrition goals for the authenticated user
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const childId = searchParams.get('childId');
  const isActive = searchParams.get('isActive');

  let query = supabase
    .from('nutrition_goals')
    .select('*')
    .eq('user_id', user.id)
    .order('priority', { ascending: false })
    .order('created_at', { ascending: false });

  // Filter by child if specified (null for parent)
  if (childId) {
    query = query.eq('child_id', childId);
  }

  // Filter by active status if specified
  if (isActive !== null) {
    query = query.eq('is_active', isActive === 'true');
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching nutrition goals:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST - Create a new nutrition goal
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const {
    child_id,
    goal_type,
    nutrient_name,
    target_value,
    target_unit,
    target_min,
    target_max,
    priority,
    notes,
    set_by,
    start_date,
    end_date,
    is_active,
  } = body;

  if (!goal_type || !target_value || !target_unit) {
    return NextResponse.json(
      { error: 'Missing required fields: goal_type, target_value, target_unit' },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from('nutrition_goals')
    .insert({
      user_id: user.id,
      child_id: child_id || null,
      goal_type,
      nutrient_name: nutrient_name || null,
      target_value,
      target_unit,
      target_min: target_min || null,
      target_max: target_max || null,
      priority: priority || 'medium',
      notes: notes || null,
      set_by: set_by || null,
      start_date: start_date || new Date().toISOString().split('T')[0],
      end_date: end_date || null,
      is_active: is_active !== undefined ? is_active : true,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating nutrition goal:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

