import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { UpdateParentMeasurementInput } from '@/types/parent';

/**
 * GET /api/parent-measurements/[id]
 * Get a specific parent measurement
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch measurement
    const { data, error } = await supabase
      .from('parent_measurements')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Measurement not found' },
          { status: 404 }
        );
      }
      console.error('Error fetching parent measurement:', error);
      return NextResponse.json(
        { error: 'Failed to fetch measurement' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in GET /api/parent-measurements/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/parent-measurements/[id]
 * Update a parent measurement
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const body: UpdateParentMeasurementInput = await request.json();

    // Validate input
    if (body.height_cm !== undefined && (body.height_cm <= 0 || body.height_cm > 300)) {
      return NextResponse.json(
        { error: 'Invalid height: must be between 0 and 300 cm' },
        { status: 400 }
      );
    }

    if (body.weight_kg !== undefined && (body.weight_kg <= 0 || body.weight_kg > 500)) {
      return NextResponse.json(
        { error: 'Invalid weight: must be between 0 and 500 kg' },
        { status: 400 }
      );
    }

    // Update measurement
    const { data, error } = await supabase
      .from('parent_measurements')
      .update(body)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Measurement not found' },
          { status: 404 }
        );
      }
      console.error('Error updating parent measurement:', error);
      return NextResponse.json(
        { error: 'Failed to update measurement' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in PUT /api/parent-measurements/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/parent-measurements/[id]
 * Delete a parent measurement
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Delete measurement
    const { error } = await supabase
      .from('parent_measurements')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting parent measurement:', error);
      return NextResponse.json(
        { error: 'Failed to delete measurement' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/parent-measurements/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


