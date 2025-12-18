import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { 
  createMeasurement, 
  getChildMeasurements 
} from '@/services/childService';

// GET: Retrieve all measurements for a child
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const measurements = await getChildMeasurements(params.id);

    return NextResponse.json({ measurements });
  } catch (error: any) {
    console.error('Error fetching measurements:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch measurements' },
      { status: 500 }
    );
  }
}

// POST: Create a new measurement for a child
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { heightCm, weightKg, measurementDate, notes } = body;

    if (!heightCm || !weightKg) {
      return NextResponse.json(
        { error: 'Height and weight are required' },
        { status: 400 }
      );
    }

    const height = parseFloat(heightCm);
    const weight = parseFloat(weightKg);

    if (height <= 0 || weight <= 0) {
      return NextResponse.json(
        { error: 'Height and weight must be positive numbers' },
        { status: 400 }
      );
    }

    const measurement = await createMeasurement({
      childId: params.id,
      heightCm: height,
      weightKg: weight,
      measurementDate: measurementDate ? new Date(measurementDate) : new Date(),
      notes,
    });

    return NextResponse.json({ measurement }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating measurement:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create measurement' },
      { status: 500 }
    );
  }
}

