import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/trends/nutrition?childId=xxx&startDate=xxx&endDate=xxx&groupBy=day|week
 * Get nutrition trends aggregated by day or week
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const searchParams = request.nextUrl.searchParams;
    const childId = searchParams.get('childId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const groupBy = searchParams.get('groupBy') || 'day';

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Build query for food entries
    let query = supabase
      .from('food_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true });

    if (childId) {
      query = query.eq('child_id', childId);
    } else {
      // Parent entries (no child_id)
      query = query.is('child_id', null);
    }

    if (startDate) {
      query = query.gte('created_at', startDate);
    }
    if (endDate) {
      // Add one day to include the end date
      const endDateTime = new Date(endDate);
      endDateTime.setDate(endDateTime.getDate() + 1);
      query = query.lt('created_at', endDateTime.toISOString());
    }

    const { data: entries, error } = await query;

    if (error) {
      console.error('Error fetching food entries:', error);
      return NextResponse.json(
        { error: 'Failed to fetch food entries' },
        { status: 500 }
      );
    }

    // Aggregate data by date
    const dailyData: Record<string, any> = {};

    entries?.forEach((entry: any) => {
      const date = new Date(entry.created_at).toISOString().split('T')[0];
      
      if (!dailyData[date]) {
        dailyData[date] = {
          date,
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
          fiber: 0,
          sugar: 0,
          sodium: 0,
          calcium: 0,
          iron: 0,
          vitaminA: 0,
          vitaminB1: 0,
          vitaminB12: 0,
          vitaminC: 0,
          vitaminD: 0,
          folate: 0,
          entryCount: 0,
        };
      }

      const nutrition = entry.nutritional_data;
      if (nutrition) {
        dailyData[date].calories += nutrition.calories || 0;
        dailyData[date].protein += nutrition.protein || 0;
        dailyData[date].carbs += nutrition.carbohydrates || 0;
        dailyData[date].fat += nutrition.fat || 0;
        dailyData[date].fiber += nutrition.fiber || 0;
        dailyData[date].sugar += nutrition.sugar || 0;
        dailyData[date].sodium += nutrition.minerals?.sodium || 0;
        dailyData[date].calcium += nutrition.minerals?.calcium || 0;
        dailyData[date].iron += nutrition.minerals?.iron || 0;
        dailyData[date].vitaminA += nutrition.vitamins?.a || 0;
        dailyData[date].vitaminB1 += nutrition.vitamins?.vitaminB1 || 0;
        dailyData[date].vitaminB12 += nutrition.vitamins?.vitaminB12 || 0;
        dailyData[date].vitaminC += nutrition.vitamins?.c || 0;
        dailyData[date].vitaminD += nutrition.vitamins?.d || 0;
        dailyData[date].folate += nutrition.vitamins?.folate || 0;
        dailyData[date].entryCount += 1;
      }
    });

    // Convert to array and sort by date
    let trends = Object.values(dailyData).sort((a, b) => 
      a.date.localeCompare(b.date)
    );

    // Round values to 1 decimal place
    trends = trends.map((day: any) => ({
      ...day,
      calories: parseFloat(day.calories.toFixed(1)),
      protein: parseFloat(day.protein.toFixed(1)),
      carbs: parseFloat(day.carbs.toFixed(1)),
      fat: parseFloat(day.fat.toFixed(1)),
      fiber: parseFloat(day.fiber.toFixed(1)),
      sugar: parseFloat(day.sugar.toFixed(1)),
      sodium: parseFloat(day.sodium.toFixed(1)),
      calcium: parseFloat(day.calcium.toFixed(1)),
      iron: parseFloat(day.iron.toFixed(1)),
      vitaminA: parseFloat(day.vitaminA.toFixed(1)),
      vitaminB1: parseFloat(day.vitaminB1.toFixed(1)),
      vitaminB12: parseFloat(day.vitaminB12.toFixed(1)),
      vitaminC: parseFloat(day.vitaminC.toFixed(1)),
      vitaminD: parseFloat(day.vitaminD.toFixed(1)),
      folate: parseFloat(day.folate.toFixed(1)),
    }));

    // If groupBy is week, aggregate by week
    if (groupBy === 'week') {
      const weeklyData: Record<string, any> = {};

      trends.forEach((day: any) => {
        const date = new Date(day.date);
        // Get Monday of the week
        const dayOfWeek = date.getDay();
        const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
        const monday = new Date(date.setDate(diff));
        const weekKey = monday.toISOString().split('T')[0];

        if (!weeklyData[weekKey]) {
          weeklyData[weekKey] = {
            weekStart: weekKey,
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
            fiber: 0,
            sugar: 0,
            sodium: 0,
            calcium: 0,
            iron: 0,
            vitaminA: 0,
            vitaminB1: 0,
            vitaminB12: 0,
            vitaminC: 0,
            vitaminD: 0,
            folate: 0,
            dayCount: 0,
            entryCount: 0,
          };
        }

        weeklyData[weekKey].calories += day.calories;
        weeklyData[weekKey].protein += day.protein;
        weeklyData[weekKey].carbs += day.carbs;
        weeklyData[weekKey].fat += day.fat;
        weeklyData[weekKey].fiber += day.fiber;
        weeklyData[weekKey].sugar += day.sugar;
        weeklyData[weekKey].sodium += day.sodium;
        weeklyData[weekKey].calcium += day.calcium;
        weeklyData[weekKey].iron += day.iron;
        weeklyData[weekKey].vitaminA += day.vitaminA;
        weeklyData[weekKey].vitaminB1 += day.vitaminB1;
        weeklyData[weekKey].vitaminB12 += day.vitaminB12;
        weeklyData[weekKey].vitaminC += day.vitaminC;
        weeklyData[weekKey].vitaminD += day.vitaminD;
        weeklyData[weekKey].folate += day.folate;
        weeklyData[weekKey].dayCount += 1;
        weeklyData[weekKey].entryCount += day.entryCount;
      });

      // Calculate weekly averages
      trends = Object.values(weeklyData).map((week: any) => {
        const days = week.dayCount || 1;
        return {
          date: week.weekStart,
          calories: parseFloat((week.calories / days).toFixed(1)),
          protein: parseFloat((week.protein / days).toFixed(1)),
          carbs: parseFloat((week.carbs / days).toFixed(1)),
          fat: parseFloat((week.fat / days).toFixed(1)),
          fiber: parseFloat((week.fiber / days).toFixed(1)),
          sugar: parseFloat((week.sugar / days).toFixed(1)),
          sodium: parseFloat((week.sodium / days).toFixed(1)),
          calcium: parseFloat((week.calcium / days).toFixed(1)),
          iron: parseFloat((week.iron / days).toFixed(1)),
          vitaminA: parseFloat((week.vitaminA / days).toFixed(1)),
          vitaminB1: parseFloat((week.vitaminB1 / days).toFixed(1)),
          vitaminB12: parseFloat((week.vitaminB12 / days).toFixed(1)),
          vitaminC: parseFloat((week.vitaminC / days).toFixed(1)),
          vitaminD: parseFloat((week.vitaminD / days).toFixed(1)),
          folate: parseFloat((week.folate / days).toFixed(1)),
          dayCount: week.dayCount,
          entryCount: week.entryCount,
        };
      }).sort((a, b) => a.date.localeCompare(b.date));
    }

    return NextResponse.json({
      trends,
      count: trends.length,
      groupBy,
    });
  } catch (error) {
    console.error('Error in GET /api/trends/nutrition:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

