import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// GET - Fetch a specific nutrition goal
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('nutrition_goals')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single();

  if (error) {
    console.error('Error fetching nutrition goal:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: 'Nutrition goal not found' }, { status: 404 });
  }

  return NextResponse.json(data);
}

// PUT - Update a specific nutrition goal
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const {
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

  const { data, error } = await supabase
    .from('nutrition_goals')
    .update({
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
    })
    .eq('id', params.id)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) {
    console.error('Error updating nutrition goal:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: 'Nutrition goal not found' }, { status: 404 });
  }

  return NextResponse.json(data);
}

// DELETE - Delete a specific nutrition goal
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { error } = await supabase
    .from('nutrition_goals')
    .delete()
    .eq('id', params.id)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error deleting nutrition goal:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Nutrition goal deleted successfully' });
}

