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

  // Fetch custom achievement preferences
  let prefsQuery = supabase
    .from('achievement_preferences')
    .select('*')
    .eq('user_id', user.id);

  if (childId) {
    prefsQuery = prefsQuery.eq('child_id', childId);
  }

  const { data: customPrefs } = await prefsQuery;

  // Create a map of custom preferences
  const prefsMap = new Map(
    (customPrefs || []).map(pref => [pref.achievement_type, pref])
  );

  // Default achievement definitions
  const defaultAchievements = [
    { type: 'first_food', threshold: 1, name: 'First Step', icon: '🌱' },
    { type: 'brave_five', threshold: 5, name: 'Brave Taster', icon: '⭐' },
    { type: 'explorer_ten', threshold: 10, name: 'Food Explorer', icon: '🗺️' },
    { type: 'adventurer_twenty', threshold: 20, name: 'Taste Adventurer', icon: '🎒' },
    { type: 'champion_fifty', threshold: 50, name: 'Food Champion', icon: '🏆' },
  ];

  // Achievement calculation with custom preferences
  const achievements = [];
  
  for (const defaultAch of defaultAchievements) {
    const pref = prefsMap.get(defaultAch.type);
    
    // Skip if explicitly disabled
    if (pref && pref.is_enabled === false) continue;
    
    const threshold = pref?.custom_threshold ?? defaultAch.threshold;
    const name = pref?.custom_name ?? defaultAch.name;
    const icon = pref?.custom_icon ?? defaultAch.icon;
    
    if (totalFoodsTried >= threshold) {
      achievements.push({ 
        id: defaultAch.type, 
        name, 
        icon, 
        unlocked: true,
        threshold,
        isCustom: !!pref
      });
    }
  }

  // Rainbow Eater (special achievement)
  const rainbowPref = prefsMap.get('rainbow_eater');
  if (!rainbowPref || rainbowPref.is_enabled !== false) {
    const rainbowThreshold = rainbowPref?.custom_threshold ?? 5;
    if (colorFoods.length >= rainbowThreshold) {
      achievements.push({ 
        id: 'rainbow_eater', 
        name: rainbowPref?.custom_name ?? 'Rainbow Eater', 
        icon: rainbowPref?.custom_icon ?? '🌈', 
        unlocked: true,
        threshold: rainbowThreshold,
        isCustom: !!rainbowPref
      });
    }
  }

  // Texture Master (special achievement)
  const texturePref = prefsMap.get('texture_master');
  if (!texturePref || texturePref.is_enabled !== false) {
    const textureThreshold = texturePref?.custom_threshold ?? 5;
    if (uniqueTextures >= textureThreshold) {
      achievements.push({ 
        id: 'texture_master', 
        name: texturePref?.custom_name ?? 'Texture Master', 
        icon: texturePref?.custom_icon ?? '🎨', 
        unlocked: true,
        threshold: textureThreshold,
        isCustom: !!texturePref
      });
    }
  }

  // Recent milestones (last 5)
  const recentMilestones = milestones
    .sort((a, b) => new Date(b.date_tried).getTime() - new Date(a.date_tried).getTime())
    .slice(0, 5);

  return NextResponse.json({
    totalFoodsTried,
    totalAttempts,
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

