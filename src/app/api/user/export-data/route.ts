import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { getFoodEntries } from '@/services/foodEntryService';

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
    const format = searchParams.get('format') || 'json';

    // Get all user entries (no filters = all entries)
    const entries = await getFoodEntries();

    if (format === 'csv') {
      // Convert to CSV
      const headers = [
        'ID',
        'Date/Time',
        'Meal Type',
        'Calories',
        'Protein (g)',
        'Carbohydrates (g)',
        'Fat (g)',
        'Fiber (g)',
        'Sugar (g)',
        'Sodium (mg)',
        'Image URL',
      ];

      const rows = entries.map((entry) => [
        entry.id,
        entry.date_time,
        entry.meal_type || '',
        entry.nutritional_data.calories || '',
        entry.nutritional_data.protein || '',
        entry.nutritional_data.carbohydrates || '',
        entry.nutritional_data.fat || '',
        entry.nutritional_data.fiber || '',
        entry.nutritional_data.sugar || '',
        entry.nutritional_data.sodium || '',
        entry.image_url,
      ]);

      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');

      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="food-entries-${new Date().toISOString().split('T')[0]}.csv"`,
        },
      });
    } else {
      // Return as JSON
      const jsonContent = JSON.stringify({ entries }, null, 2);
      return new NextResponse(jsonContent, {
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="food-entries-${new Date().toISOString().split('T')[0]}.json"`,
        },
      });
    }
  } catch (error: any) {
    console.error('Error exporting data:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to export data' },
      { status: 500 }
    );
  }
}

