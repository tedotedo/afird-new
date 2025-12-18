import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { getDailySummary } from '@/services/foodEntryService';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const dateParam = searchParams.get('date');
    const childId = searchParams.get('childId');

    if (!dateParam) {
      return NextResponse.json(
        { error: 'Date parameter is required (YYYY-MM-DD)' },
        { status: 400 }
      );
    }

    const targetDate = new Date(dateParam);
    if (isNaN(targetDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format. Use YYYY-MM-DD' },
        { status: 400 }
      );
    }

    const summary = await getDailySummary(targetDate, childId || undefined);

    return NextResponse.json(summary);
  } catch (error: any) {
    console.error('Error fetching daily summary:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch daily summary' },
      { status: 500 }
    );
  }
}

