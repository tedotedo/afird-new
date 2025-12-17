import { createAdminClient } from '@/lib/supabase/admin';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Admin statistics API endpoint
 * Returns aggregated anonymized statistics across all users
 * Protected by ADMIN_API_KEY environment variable
 */
export async function GET(request: NextRequest) {
  try {
    // Check for admin API key
    const authHeader = request.headers.get('authorization');
    const adminApiKey = process.env.ADMIN_API_KEY;
    
    if (!adminApiKey) {
      return NextResponse.json(
        { error: 'Admin API key not configured' },
        { status: 500 }
      );
    }

    // Verify admin API key
    if (!authHeader || authHeader !== `Bearer ${adminApiKey}`) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid admin API key' },
        { status: 401 }
      );
    }

    const supabase = createAdminClient();

    // Query 1: Daily aggregated stats (anonymized)
    const { data: dailyStats, error: dailyError } = await supabase.rpc('get_daily_stats');
    
    // If RPC doesn't exist, use direct query
    let dailyAggregatedStats;
    if (dailyError) {
      const { data, error } = await supabase
        .from('food_entries')
        .select('date_time, nutritional_data, user_id');
      
      if (error) throw error;
      
      // Process in memory (for smaller datasets)
      const statsByDate = new Map<string, {
        date: string;
        total_entries: number;
        unique_users: Set<string>;
        total_calories: number;
        entry_count: number;
      }>();

      data?.forEach((entry: any) => {
        const date = new Date(entry.date_time).toISOString().split('T')[0];
        const calories = parseFloat(entry.nutritional_data?.calories || '0');
        
        if (!statsByDate.has(date)) {
          statsByDate.set(date, {
            date,
            total_entries: 0,
            unique_users: new Set(),
            total_calories: 0,
            entry_count: 0,
          });
        }
        
        const stat = statsByDate.get(date)!;
        stat.total_entries++;
        stat.unique_users.add(entry.user_id);
        stat.total_calories += calories;
        stat.entry_count++;
      });

      dailyAggregatedStats = Array.from(statsByDate.values())
        .map(stat => ({
          date: stat.date,
          total_entries: stat.total_entries,
          unique_users: stat.unique_users.size,
          avg_calories: stat.entry_count > 0 ? stat.total_calories / stat.entry_count : 0,
        }))
        .sort((a, b) => b.date.localeCompare(a.date));
    } else {
      dailyAggregatedStats = dailyStats;
    }

    // Query 2: Meal type distribution
    const { data: mealTypeData, error: mealTypeError } = await supabase
      .from('food_entries')
      .select('meal_type');

    if (mealTypeError) throw mealTypeError;

    const mealTypeCounts = new Map<string, number>();
    let totalWithMealType = 0;

    mealTypeData?.forEach((entry: any) => {
      if (entry.meal_type) {
        mealTypeCounts.set(
          entry.meal_type,
          (mealTypeCounts.get(entry.meal_type) || 0) + 1
        );
        totalWithMealType++;
      }
    });

    const mealTypeDistribution = Array.from(mealTypeCounts.entries())
      .map(([meal_type, count]) => ({
        meal_type,
        count,
        percentage: totalWithMealType > 0
          ? Math.round((count / totalWithMealType) * 100 * 100) / 100
          : 0,
      }))
      .sort((a, b) => b.count - a.count);

    // Query 3: Average nutrition per entry
    const { data: allEntries, error: nutritionError } = await supabase
      .from('food_entries')
      .select('nutritional_data');

    if (nutritionError) throw nutritionError;

    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let entryCount = 0;

    allEntries?.forEach((entry: any) => {
      const nutrition = entry.nutritional_data || {};
      totalCalories += parseFloat(nutrition.calories || '0');
      totalProtein += parseFloat(nutrition.protein || '0');
      totalCarbs += parseFloat(nutrition.carbohydrates || '0');
      totalFat += parseFloat(nutrition.fat || '0');
      entryCount++;
    });

    const averageNutrition = {
      avg_calories: entryCount > 0 ? totalCalories / entryCount : 0,
      avg_protein: entryCount > 0 ? totalProtein / entryCount : 0,
      avg_carbs: entryCount > 0 ? totalCarbs / entryCount : 0,
      avg_fat: entryCount > 0 ? totalFat / entryCount : 0,
    };

    // Get overall statistics
    const { count: totalEntries, error: countError } = await supabase
      .from('food_entries')
      .select('*', { count: 'exact', head: true });

    if (countError) throw countError;

    const { data: uniqueUsersData, error: usersError } = await supabase
      .from('food_entries')
      .select('user_id');

    if (usersError) throw usersError;

    const uniqueUsers = new Set(uniqueUsersData?.map((e: any) => e.user_id) || []);

    return NextResponse.json({
      summary: {
        total_entries: totalEntries || 0,
        unique_users: uniqueUsers.size,
      },
      daily_stats: dailyAggregatedStats,
      meal_type_distribution: mealTypeDistribution,
      average_nutrition: averageNutrition,
    });
  } catch (error: any) {
    console.error('Error fetching admin statistics:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}

