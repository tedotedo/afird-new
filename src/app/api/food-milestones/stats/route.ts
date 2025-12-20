import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// GET - Fetch statistics and achievements for food milestones
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const childId = searchParams.get('childId');

  let query = supabase
    .from('food_milestones')
    .select('*')
    .eq('user_id', user.id);

  if (childId) {
    query = query.eq('child_id', childId);
  }

  const { data: milestones, error } = await query;

  if (error) {
    console.error('Error fetching food milestones for stats:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!milestones) {
    return NextResponse.json({ error: 'No milestones found' }, { status: 404 });
  }

  // Calculate statistics
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

  const totalFoodsTried = new Set(milestones.map(m => m.food_name.toLowerCase())).size;
  const totalAttempts = milestones.length;
  
  const successfulAttempts = milestones.filter(m => 
    ['bite', 'finished'].includes(m.success_level)
  ).length;

  const thisWeek = milestones.filter(m => 
    new Date(m.date_tried) >= oneWeekAgo
  );
  const newFoodsThisWeek = new Set(thisWeek.map(m => m.food_name.toLowerCase())).size;

  const thisMonth = milestones.filter(m => 
    new Date(m.date_tried) >= oneMonthAgo
  );
  const newFoodsThisMonth = new Set(thisMonth.map(m => m.food_name.toLowerCase())).size;

  const thisYear = milestones.filter(m => 
    new Date(m.date_tried) >= oneYearAgo
  );
  const newFoodsThisYear = new Set(thisYear.map(m => m.food_name.toLowerCase())).size;

  // Category breakdown
  const categories = milestones.reduce((acc, m) => {
    const cat = m.food_category || 'other';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Texture breakdown
  const textures = milestones.reduce((acc, m) => {
    if (m.texture) {
      acc[m.texture] = (acc[m.texture] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const uniqueTextures = Object.keys(textures).length;

  // Check for "all colors" achievement (rainbow eater)
  const colorCategories = ['fruit', 'vegetable'];
  const colorFoods = milestones.filter(m => 
    m.food_category && colorCategories.includes(m.food_category)
  );
  const hasRainbowFoods = colorFoods.length >= 5; // Simplified check

  // Achievement calculation
  const achievements = [];
  
  if (totalFoodsTried >= 1) achievements.push({ id: 'first_food', name: 'First Step', icon: '🌱', unlocked: true });
  if (totalFoodsTried >= 5) achievements.push({ id: 'brave_five', name: 'Brave Taster', icon: '⭐', unlocked: true });
  if (totalFoodsTried >= 10) achievements.push({ id: 'explorer_ten', name: 'Food Explorer', icon: '🗺️', unlocked: true });
  if (totalFoodsTried >= 20) achievements.push({ id: 'adventurer_twenty', name: 'Taste Adventurer', icon: '🎒', unlocked: true });
  if (totalFoodsTried >= 50) achievements.push({ id: 'champion_fifty', name: 'Food Champion', icon: '🏆', unlocked: true });
  if (hasRainbowFoods) achievements.push({ id: 'rainbow_eater', name: 'Rainbow Eater', icon: '🌈', unlocked: true });
  if (uniqueTextures >= 5) achievements.push({ id: 'texture_master', name: 'Texture Master', icon: '🎨', unlocked: true });

  // Recent milestones (last 5)
  const recentMilestones = milestones
    .sort((a, b) => new Date(b.date_tried).getTime() - new Date(a.date_tried).getTime())
    .slice(0, 5);

  return NextResponse.json({
    totalFoodsTried,
    totalAttempts,
    successfulAttempts,
    successRate: totalAttempts > 0 ? Math.round((successfulAttempts / totalAttempts) * 100) : 0,
    newFoodsThisWeek,
    newFoodsThisMonth,
    newFoodsThisYear,
    categories,
    textures,
    uniqueTextures,
    achievements,
    recentMilestones,
  });
}

