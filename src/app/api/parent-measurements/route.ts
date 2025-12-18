import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { CreateParentMeasurementInput } from '@/types/parent';

/**
 * GET /api/parent-measurements
 * Get all parent measurements for the current user
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

    // Fetch measurements
    const { data, error } = await supabase
      .from('parent_measurements')
      .select('*')
      .eq('user_id', user.id)
      .order('measurement_date', { ascending: false });

    if (error) {
      console.error('Error fetching parent measurements:', error);
      return NextResponse.json(
        { error: 'Failed to fetch measurements' },
        { status: 500 }
      );
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error in GET /api/parent-measurements:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/parent-measurements
 * Create a new parent measurement
 */
export async function POST(request: NextRequest) {
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

    // Parse request body
    const body: CreateParentMeasurementInput = await request.json();

    // Validate input
    if (!body.height_cm || !body.weight_kg || !body.measurement_date) {
      return NextResponse.json(
        { error: 'Missing required fields: height_cm, weight_kg, measurement_date' },
        { status: 400 }
      );
    }

    if (body.height_cm <= 0 || body.height_cm > 300) {
      return NextResponse.json(
        { error: 'Invalid height: must be between 0 and 300 cm' },
        { status: 400 }
      );
    }

    if (body.weight_kg <= 0 || body.weight_kg > 500) {
      return NextResponse.json(
        { error: 'Invalid weight: must be between 0 and 500 kg' },
        { status: 400 }
      );
    }

    // Create measurement
    const { data, error } = await supabase
      .from('parent_measurements')
      .insert({
        user_id: user.id,
        height_cm: body.height_cm,
        weight_kg: body.weight_kg,
        measurement_date: body.measurement_date,
        notes: body.notes || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating parent measurement:', error);
      return NextResponse.json(
        { error: 'Failed to create measurement' },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/parent-measurements:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

