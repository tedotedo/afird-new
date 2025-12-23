import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { calculateBMI } from '@/data/whoBMIStandards';

/**
 * GET /api/trends/growth?childId=xxx&startDate=xxx&endDate=xxx
 * Get growth trends (height, weight, BMI) for a child or parent
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const searchParams = request.nextUrl.searchParams;
    const childId = searchParams.get('childId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let measurements: any[] = [];

    if (childId) {
      // Get child measurements
      let query = supabase
        .from('child_measurements')
        .select('*, child:children!inner(id, name, date_of_birth, sex, user_id)')
        .eq('child_id', childId)
        .eq('children.user_id', user.id)
        .order('measurement_date', { ascending: true });

      if (startDate) {
        query = query.gte('measurement_date', startDate);
      }
      if (endDate) {
        query = query.lte('measurement_date', endDate);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching child measurements:', error);
        return NextResponse.json(
          { error: 'Failed to fetch measurements' },
          { status: 500 }
        );
      }

      // Calculate BMI for each measurement
      measurements = (data || []).map((m: any) => {
        const bmi = calculateBMI(m.height_cm, m.weight_kg);
        return {
          date: m.measurement_date,
          height: m.height_cm,
          weight: m.weight_kg,
          bmi: parseFloat(bmi.toFixed(1)),
          notes: m.notes,
          childName: m.child.name,
        };
      });
    } else {
      // Get parent measurements
      let query = supabase
        .from('parent_measurements')
        .select('*')
        .eq('user_id', user.id)
        .order('measurement_date', { ascending: true });

      if (startDate) {
        query = query.gte('measurement_date', startDate);
      }
      if (endDate) {
        query = query.lte('measurement_date', endDate);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching parent measurements:', error);
        return NextResponse.json(
          { error: 'Failed to fetch measurements' },
          { status: 500 }
        );
      }

      // Calculate BMI for each measurement
      measurements = (data || []).map((m: any) => {
        const bmi = calculateBMI(m.height_cm, m.weight_kg);
        return {
          date: m.measurement_date,
          height: m.height_cm,
          weight: m.weight_kg,
          bmi: parseFloat(bmi.toFixed(1)),
          notes: m.notes,
        };
      });
    }

    return NextResponse.json({
      measurements,
      count: measurements.length,
    });
  } catch (error) {
    console.error('Error in GET /api/trends/growth:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


