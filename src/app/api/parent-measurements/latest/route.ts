import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/parent-measurements/latest
 * Get the most recent parent measurement
 */
export async function GET() {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch latest measurement
    const { data, error } = await supabase
      .from('parent_measurements')
      .select('*')
      .eq('user_id', user.id)
      .order('measurement_date', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error fetching latest parent measurement:', error);
      return NextResponse.json(
        { error: 'Failed to fetch latest measurement' },
        { status: 500 }
      );
    }

    return NextResponse.json(data || null);
  } catch (error) {
    console.error('Error in GET /api/parent-measurements/latest:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

