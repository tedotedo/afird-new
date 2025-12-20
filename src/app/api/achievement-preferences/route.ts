import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// GET - Fetch achievement preferences for the authenticated user
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const childId = searchParams.get('childId');

  let query = supabase
    .from('achievement_preferences')
    .select('*')
    .eq('user_id', user.id);

  if (childId) {
    query = query.eq('child_id', childId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching achievement preferences:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || []);
}

// POST - Create or update achievement preferences
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const {
    child_id,
    achievement_type,
    custom_threshold,
    custom_name,
    custom_icon,
    is_enabled,
  } = body;

  if (!achievement_type) {
    return NextResponse.json(
      { error: 'Missing required field: achievement_type' },
      { status: 400 }
    );
  }

  // Check if preference already exists
  const { data: existing } = await supabase
    .from('achievement_preferences')
    .select('id')
    .eq('user_id', user.id)
    .eq('achievement_type', achievement_type)
    .eq('child_id', child_id || null)
    .single();

  if (existing) {
    // Update existing
    const { data, error } = await supabase
      .from('achievement_preferences')
      .update({
        custom_threshold,
        custom_name,
        custom_icon,
        is_enabled: is_enabled !== undefined ? is_enabled : true,
      })
      .eq('id', existing.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating achievement preference:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } else {
    // Create new
    const { data, error } = await supabase
      .from('achievement_preferences')
      .insert({
        user_id: user.id,
        child_id: child_id || null,
        achievement_type,
        custom_threshold,
        custom_name,
        custom_icon,
        is_enabled: is_enabled !== undefined ? is_enabled : true,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating achievement preference:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  }
}

// DELETE - Reset all preferences (delete all for user/child)
export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const childId = searchParams.get('childId');

  let query = supabase
    .from('achievement_preferences')
    .delete()
    .eq('user_id', user.id);

  if (childId) {
    query = query.eq('child_id', childId);
  }

  const { error } = await query;

  if (error) {
    console.error('Error deleting achievement preferences:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Achievement preferences reset to defaults' });
}

