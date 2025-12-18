/**
 * Comprehensive Nutrition Information Database
 * Sources: WHO, NIH, Mayo Clinic, Harvard Health, CDC
 */

export interface NutrientInfo {
  id: string;
  name: string;
  category: 'vitamin' | 'mineral' | 'macronutrient';
  unit: string;
  
  // Core Information
  function: string;
  benefits: string[];
  foodSources: string[];
  deficiencySymptoms: string[];
  excessSymptoms?: string[];
  
  // Age-Specific Info
  childrenInfo: string;
  
  // Additional Details
  absorptionTips: string[];
  interactions: string[];
  
  // Authoritative Links
  links: {
    label: string;
    url: string;
    source: 'WHO' | 'NIH' | 'Mayo Clinic' | 'Harvard Health' | 'CDC';
  }[];
}

export const NUTRITION_INFO_DATABASE: NutrientInfo[] = [
  // VITAMINS
  {
    id: 'vitamin-a',
    name: 'Vitamin A',
    category: 'vitamin',
    unit: 'mcg RAE',
    function: 'Essential for vision, immune function, and cell growth. Supports healthy skin and mucous membranes.',
    benefits: [
      'Maintains healthy vision, especially night vision',
      'Supports immune system function',
      'Promotes healthy skin and tissues',
      'Important for reproduction and fetal development',
      'Supports bone growth in children'
    ],
    foodSources: [
      'Sweet potatoes',
      'Carrots',
      'Spinach and kale',
      'Liver',
      'Eggs',
      'Milk and dairy products',
      'Orange and yellow vegetables',
      'Cantaloupe'
    ],
    deficiencySymptoms: [
      'Night blindness',
      'Dry eyes and skin',
      'Increased infections',
      'Delayed growth in children',
      'Dry, scaly skin'
    ],
    excessSymptoms: [
      'Nausea and dizziness',
      'Headaches',
      'Skin irritation',
      'Liver damage (chronic excess)',
      'Birth defects if excess during pregnancy'
    ],
    childrenInfo: 'Critical for children\'s eye development, growth, and immune system. Deficiency is a leading cause of preventable childhood blindness in developing countries.',
    absorptionTips: [
      'Better absorbed with dietary fat',
      'Cook vegetables to break down cell walls',
      'Pair with healthy oils or butter',
      'Beta-carotene from plants converts to vitamin A'
    ],
    interactions: [
      'Works with zinc for proper utilization',
      'Fat-soluble, needs adequate fat intake',
      'May interact with certain acne medications'
    ],
    links: [
      {
        label: 'Vitamin A Fact Sheet',
        url: 'https://ods.od.nih.gov/factsheets/VitaminA-Consumer/',
        source: 'NIH'
      },
      {
        label: 'Vitamin A Overview',
        url: 'https://www.mayoclinic.org/drugs-supplements-vitamin-a/art-20365945',
        source: 'Mayo Clinic'
      }
    ]
  },
  {
    id: 'vitamin-b1',
    name: 'Vitamin B1 (Thiamine)',
    category: 'vitamin',
    unit: 'mg',
    function: 'Helps convert food into energy. Essential for glucose metabolism and nerve, muscle, and heart function.',
    benefits: [
      'Converts carbohydrates into energy',
      'Supports nervous system function',
      'Maintains healthy heart function',
      'Promotes muscle function',
      'Supports mental well-being'
    ],
    foodSources: [
      'Whole grains',
      'Fortified cereals',
      'Pork',
      'Legumes (beans, lentils)',
      'Nuts and seeds',
      'Fish',
      'Enriched bread and pasta'
    ],
    deficiencySymptoms: [
      'Fatigue and weakness',
      'Nerve damage',
      'Muscle weakness',
      'Mental confusion',
      'Beriberi (severe deficiency)'
    ],
    childrenInfo: 'Essential for children\'s growth, brain development, and energy production. Supports learning and concentration.',
    absorptionTips: [
      'Avoid excessive tea and coffee with meals',
      'Alcohol can interfere with absorption',
      'Raw fish contains thiaminase that destroys B1'
    ],
    interactions: [
      'Works with other B vitamins for energy',
      'May be depleted by diuretics',
      'Alcohol interferes with absorption'
    ],
    links: [
      {
        label: 'Thiamine Fact Sheet',
        url: 'https://ods.od.nih.gov/factsheets/Thiamin-Consumer/',
        source: 'NIH'
      }
    ]
  },
  {
    id: 'vitamin-b12',
    name: 'Vitamin B12 (Cobalamin)',
    category: 'vitamin',
    unit: 'mcg',
    function: 'Essential for red blood cell formation, DNA synthesis, and neurological function.',
    benefits: [
      'Produces red blood cells',
      'Maintains nervous system health',
      'Supports DNA synthesis',
      'Prevents anemia',
      'Supports brain function and mood'
    ],
    foodSources: [
      'Meat, poultry, fish',
      'Eggs',
      'Milk and dairy products',
      'Fortified cereals',
      'Fortified plant milks',
      'Nutritional yeast',
      'Shellfish'
    ],
    deficiencySymptoms: [
      'Fatigue and weakness',
      'Anemia',
      'Tingling in hands and feet',
      'Memory problems',
      'Depression',
      'Difficulty walking'
    ],
    childrenInfo: 'Critical for children\'s brain development, growth, and blood cell production. Especially important for children on vegetarian diets.',
    absorptionTips: [
      'Requires stomach acid for absorption',
      'Vegetarians/vegans need fortified foods or supplements',
      'Absorption decreases with age',
      'Take with food for better absorption'
    ],
    interactions: [
      'Works with folate for red blood cell production',
      'Some medications reduce absorption',
      'Stomach acid reducers may decrease absorption'
    ],
    links: [
      {
        label: 'Vitamin B12 Fact Sheet',
        url: 'https://ods.od.nih.gov/factsheets/VitaminB12-Consumer/',
        source: 'NIH'
      },
      {
        label: 'B12 Deficiency',
        url: 'https://www.mayoclinic.org/diseases-conditions/vitamin-deficiency-anemia/symptoms-causes/syc-20355025',
        source: 'Mayo Clinic'
      }
    ]
  },
  {
    id: 'vitamin-c',
    name: 'Vitamin C (Ascorbic Acid)',
    category: 'vitamin',
    unit: 'mg',
    function: 'Powerful antioxidant that supports immune function, collagen production, and iron absorption.',
    benefits: [
      'Boosts immune system',
      'Promotes wound healing',
      'Maintains healthy skin, bones, and teeth',
      'Enhances iron absorption',
      'Protects cells from damage',
      'Supports cardiovascular health'
    ],
    foodSources: [
      'Citrus fruits (oranges, lemons)',
      'Strawberries',
      'Bell peppers',
      'Broccoli',
      'Tomatoes',
      'Kiwi',
      'Brussels sprouts',
      'Cantaloupe'
    ],
    deficiencySymptoms: [
      'Fatigue',
      'Weakened immune system',
      'Slow wound healing',
      'Dry, rough skin',
      'Easy bruising',
      'Scurvy (severe deficiency)'
    ],
    excessSymptoms: [
      'Diarrhea',
      'Nausea',
      'Stomach cramps',
      'Kidney stones (very high doses)'
    ],
    childrenInfo: 'Supports children\'s immune system, tissue growth, and wound healing. Helps absorb iron from plant foods.',
    absorptionTips: [
      'Eat fresh fruits and vegetables',
      'Cook vegetables lightly to preserve vitamin C',
      'Take with iron-rich foods to enhance iron absorption',
      'Water-soluble, needs daily intake'
    ],
    interactions: [
      'Enhances iron absorption from plant sources',
      'May interact with some chemotherapy drugs',
      'High doses may interfere with certain tests'
    ],
    links: [
      {
        label: 'Vitamin C Fact Sheet',
        url: 'https://ods.od.nih.gov/factsheets/VitaminC-Consumer/',
        source: 'NIH'
      },
      {
        label: 'Vitamin C Benefits',
        url: 'https://www.hsph.harvard.edu/nutritionsource/vitamin-c/',
        source: 'Harvard Health'
      }
    ]
  },
  {
    id: 'vitamin-d',
    name: 'Vitamin D',
    category: 'vitamin',
    unit: 'mcg',
    function: 'Essential for calcium absorption, bone health, and immune function. Produced by skin when exposed to sunlight.',
    benefits: [
      'Builds and maintains strong bones',
      'Supports immune system',
      'Regulates calcium and phosphorus',
      'Promotes muscle function',
      'Supports mood and mental health',
      'May reduce cancer risk'
    ],
    foodSources: [
      'Fatty fish (salmon, mackerel, tuna)',
      'Fortified milk',
      'Fortified cereals',
      'Egg yolks',
      'Mushrooms exposed to UV light',
      'Cod liver oil',
      'Fortified orange juice'
    ],
    deficiencySymptoms: [
      'Bone pain and weakness',
      'Muscle weakness',
      'Rickets in children',
      'Osteomalacia in adults',
      'Increased infection risk',
      'Fatigue'
    ],
    childrenInfo: 'Critical for children\'s bone development and growth. Deficiency can cause rickets, delayed growth, and weakened bones.',
    absorptionTips: [
      'Get safe sun exposure (10-30 min, 2x/week)',
      'Fat-soluble, absorb better with meals containing fat',
      'Dark-skinned individuals may need more sun exposure',
      'Northern latitudes may need supplementation in winter'
    ],
    interactions: [
      'Works with calcium for bone health',
      'Works with phosphorus for mineral balance',
      'Some medications may interfere with absorption'
    ],
    links: [
      {
        label: 'Vitamin D Fact Sheet',
        url: 'https://ods.od.nih.gov/factsheets/VitaminD-Consumer/',
        source: 'NIH'
      },
      {
        label: 'Vitamin D Deficiency',
        url: 'https://www.mayoclinic.org/diseases-conditions/vitamin-d-deficiency/symptoms-causes/syc-20350120',
        source: 'Mayo Clinic'
      }
    ]
  },
  {
    id: 'folate',
    name: 'Folate (Vitamin B9)',
    category: 'vitamin',
    unit: 'mcg',
    function: 'Essential for DNA synthesis, cell division, and red blood cell formation. Critical during pregnancy.',
    benefits: [
      'Supports cell division and growth',
      'Prevents neural tube defects in pregnancy',
      'Forms red blood cells',
      'Supports mental health',
      'Reduces homocysteine levels',
      'Important for fetal development'
    ],
    foodSources: [
      'Leafy green vegetables',
      'Legumes (beans, lentils)',
      'Fortified grains and cereals',
      'Asparagus',
      'Brussels sprouts',
      'Avocado',
      'Citrus fruits',
      'Eggs'
    ],
    deficiencySymptoms: [
      'Anemia',
      'Fatigue',
      'Gray hair',
      'Mouth sores',
      'Tongue swelling',
      'Growth problems',
      'Neural tube defects in babies'
    ],
    childrenInfo: 'Essential for children\'s rapid growth and development. Supports brain development and prevents anemia.',
    absorptionTips: [
      'Eat fresh, raw vegetables when possible',
      'Cooking can destroy folate',
      'Alcohol interferes with absorption',
      'Supplement if planning pregnancy'
    ],
    interactions: [
      'Works with B12 for red blood cell production',
      'Some medications reduce folate levels',
      'May interact with seizure medications'
    ],
    links: [
      {
        label: 'Folate Fact Sheet',
        url: 'https://ods.od.nih.gov/factsheets/Folate-Consumer/',
        source: 'NIH'
      }
    ]
  },

  // MINERALS
  {
    id: 'calcium',
    name: 'Calcium',
    category: 'mineral',
    unit: 'mg',
    function: 'Essential for building and maintaining strong bones and teeth. Also vital for muscle function, nerve transmission, and blood clotting.',
    benefits: [
      'Builds and maintains strong bones',
      'Strengthens teeth',
      'Supports muscle function',
      'Enables nerve signaling',
      'Helps blood clotting',
      'May reduce blood pressure'
    ],
    foodSources: [
      'Milk, cheese, yogurt',
      'Fortified plant milks',
      'Tofu',
      'Leafy greens (kale, collards)',
      'Sardines and salmon with bones',
      'Fortified cereals',
      'Almonds',
      'Broccoli'
    ],
    deficiencySymptoms: [
      'Weak, brittle bones (osteoporosis)',
      'Tooth decay',
      'Muscle cramps',
      'Numbness and tingling',
      'Stunted growth in children',
      'Rickets in children'
    ],
    excessSymptoms: [
      'Kidney stones',
      'Constipation',
      'Interference with iron and zinc absorption',
      'Increased heart attack risk (very high doses)'
    ],
    childrenInfo: 'Critical for children\'s bone growth and dental development. Peak bone mass is built during childhood and adolescence.',
    absorptionTips: [
      'Take with vitamin D for better absorption',
      'Spread intake throughout the day',
      'Avoid taking with high-fiber meals',
      'Calcium citrate absorbs better than carbonate'
    ],
    interactions: [
      'Vitamin D enhances calcium absorption',
      'High sodium increases calcium loss',
      'May interfere with iron and zinc absorption',
      'Caffeine increases calcium excretion'
    ],
    links: [
      {
        label: 'Calcium Fact Sheet',
        url: 'https://ods.od.nih.gov/factsheets/Calcium-Consumer/',
        source: 'NIH'
      },
      {
        label: 'Calcium and Strong Bones',
        url: 'https://www.hsph.harvard.edu/nutritionsource/calcium/',
        source: 'Harvard Health'
      }
    ]
  },
  {
    id: 'iron',
    name: 'Iron',
    category: 'mineral',
    unit: 'mg',
    function: 'Essential component of hemoglobin, which carries oxygen in blood. Also important for energy production and immune function.',
    benefits: [
      'Carries oxygen throughout the body',
      'Prevents anemia',
      'Supports energy production',
      'Boosts immune function',
      'Supports cognitive development',
      'Important for growth'
    ],
    foodSources: [
      'Red meat, poultry',
      'Fish and shellfish',
      'Beans and lentils',
      'Fortified cereals',
      'Spinach and leafy greens',
      'Tofu',
      'Quinoa',
      'Dark chocolate'
    ],
    deficiencySymptoms: [
      'Fatigue and weakness',
      'Pale skin',
      'Shortness of breath',
      'Dizziness',
      'Cold hands and feet',
      'Frequent infections',
      'Poor concentration'
    ],
    excessSymptoms: [
      'Nausea and vomiting',
      'Constipation',
      'Liver damage',
      'Heart problems',
      'Joint pain'
    ],
    childrenInfo: 'Critical for children\'s growth, brain development, and preventing anemia. Growing children and teenage girls have higher needs.',
    absorptionTips: [
      'Vitamin C enhances iron absorption',
      'Heme iron (from meat) absorbs better than non-heme',
      'Avoid tea/coffee with iron-rich meals',
      'Calcium can inhibit iron absorption',
      'Cook in cast iron pots to increase iron'
    ],
    interactions: [
      'Vitamin C greatly enhances absorption',
      'Calcium inhibits iron absorption',
      'Tannins in tea/coffee reduce absorption',
      'Phytates in grains may reduce absorption'
    ],
    links: [
      {
        label: 'Iron Fact Sheet',
        url: 'https://ods.od.nih.gov/factsheets/Iron-Consumer/',
        source: 'NIH'
      },
      {
        label: 'Iron Deficiency Anemia',
        url: 'https://www.mayoclinic.org/diseases-conditions/iron-deficiency-anemia/symptoms-causes/syc-20355034',
        source: 'Mayo Clinic'
      }
    ]
  },
  {
    id: 'zinc',
    name: 'Zinc',
    category: 'mineral',
    unit: 'mg',
    function: 'Essential for immune function, wound healing, protein synthesis, and DNA synthesis. Supports growth and development.',
    benefits: [
      'Supports immune system function',
      'Promotes wound healing',
      'Supports growth and development',
      'Maintains sense of taste and smell',
      'Supports DNA synthesis',
      'Promotes skin health'
    ],
    foodSources: [
      'Oysters and shellfish',
      'Beef and poultry',
      'Beans and lentils',
      'Nuts and seeds',
      'Whole grains',
      'Fortified cereals',
      'Dairy products'
    ],
    deficiencySymptoms: [
      'Impaired immune function',
      'Hair loss',
      'Delayed wound healing',
      'Loss of appetite',
      'Impaired taste and smell',
      'Growth retardation in children',
      'Skin lesions'
    ],
    excessSymptoms: [
      'Nausea',
      'Loss of appetite',
      'Stomach cramps',
      'Headaches',
      'Reduced immunity (chronic excess)'
    ],
    childrenInfo: 'Essential for children\'s growth, immune function, and development. Supports learning and cognitive development.',
    absorptionTips: [
      'Animal sources absorb better than plant sources',
      'Phytates in grains reduce absorption',
      'Take between meals if supplementing',
      'Avoid high doses of calcium with zinc'
    ],
    interactions: [
      'High calcium may reduce zinc absorption',
      'Competes with iron for absorption',
      'Copper levels may be affected by excess zinc'
    ],
    links: [
      {
        label: 'Zinc Fact Sheet',
        url: 'https://ods.od.nih.gov/factsheets/Zinc-Consumer/',
        source: 'NIH'
      }
    ]
  },

  // MACRONUTRIENTS
  {
    id: 'protein',
    name: 'Protein',
    category: 'macronutrient',
    unit: 'g',
    function: 'Building blocks of body tissues, enzymes, hormones, and antibodies. Essential for growth, repair, and maintenance.',
    benefits: [
      'Builds and repairs tissues',
      'Makes enzymes and hormones',
      'Supports immune function',
      'Provides energy when needed',
      'Maintains muscle mass',
      'Supports satiety and weight management'
    ],
    foodSources: [
      'Meat, poultry, fish',
      'Eggs',
      'Dairy products',
      'Beans and lentils',
      'Nuts and seeds',
      'Tofu and tempeh',
      'Quinoa',
      'Greek yogurt'
    ],
    deficiencySymptoms: [
      'Muscle wasting',
      'Weakened immune system',
      'Slow wound healing',
      'Edema (fluid retention)',
      'Stunted growth in children',
      'Hair loss'
    ],
    excessSymptoms: [
      'Kidney stress (in susceptible individuals)',
      'Dehydration',
      'Increased calcium excretion',
      'Weight gain if calories excessive'
    ],
    childrenInfo: 'Critical for children\'s growth, muscle development, and immune function. Needs increase during growth spurts.',
    absorptionTips: [
      'Combine plant proteins for complete amino acids',
      'Spread intake throughout the day',
      'Pair with carbs after exercise for recovery',
      'Variety ensures all essential amino acids'
    ],
    interactions: [
      'Works with vitamin B6 for metabolism',
      'Requires adequate water intake',
      'May increase calcium needs'
    ],
    links: [
      {
        label: 'Protein',
        url: 'https://www.hsph.harvard.edu/nutritionsource/what-should-you-eat/protein/',
        source: 'Harvard Health'
      },
      {
        label: 'Protein Requirements',
        url: 'https://www.cdc.gov/nutrition/infantandtoddlernutrition/foods-and-drinks/proteins.html',
        source: 'CDC'
      }
    ]
  },
  {
    id: 'fiber',
    name: 'Dietary Fiber',
    category: 'macronutrient',
    unit: 'g',
    function: 'Indigestible plant material that promotes digestive health, regulates blood sugar, and supports heart health.',
    benefits: [
      'Promotes regular bowel movements',
      'Prevents constipation',
      'Supports healthy gut bacteria',
      'Helps control blood sugar',
      'Lowers cholesterol',
      'Promotes satiety and weight management'
    ],
    foodSources: [
      'Whole grains',
      'Fruits (especially with skin)',
      'Vegetables',
      'Beans and lentils',
      'Nuts and seeds',
      'Oats',
      'Berries',
      'Broccoli and Brussels sprouts'
    ],
    deficiencySymptoms: [
      'Constipation',
      'Irregular bowel movements',
      'Increased hunger',
      'Blood sugar fluctuations',
      'Higher cholesterol levels'
    ],
    childrenInfo: 'Important for children\'s digestive health and establishing healthy eating patterns. Helps prevent constipation.',
    absorptionTips: [
      'Increase gradually to avoid gas',
      'Drink plenty of water with fiber',
      'Eat whole fruits instead of juice',
      'Choose whole grains over refined'
    ],
    interactions: [
      'May reduce absorption of some minerals if excessive',
      'Requires adequate water intake',
      'May interfere with some medications'
    ],
    links: [
      {
        label: 'Fiber',
        url: 'https://www.hsph.harvard.edu/nutritionsource/carbohydrates/fiber/',
        source: 'Harvard Health'
      },
      {
        label: 'Fiber Benefits',
        url: 'https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/fiber/art-20043983',
        source: 'Mayo Clinic'
      }
    ]
  }
];

/**
 * Get nutrient info by ID
 */
export function getNutrientInfo(id: string): NutrientInfo | undefined {
  return NUTRITION_INFO_DATABASE.find(n => n.id === id);
}

/**
 * Get all nutrients by category
 */
export function getNutrientsByCategory(category: 'vitamin' | 'mineral' | 'macronutrient'): NutrientInfo[] {
  return NUTRITION_INFO_DATABASE.filter(n => n.category === category);
}

/**
 * Search nutrients by name or keywords
 */
export function searchNutrients(query: string): NutrientInfo[] {
  const lowerQuery = query.toLowerCase();
  return NUTRITION_INFO_DATABASE.filter(n =>
    n.name.toLowerCase().includes(lowerQuery) ||
    n.function.toLowerCase().includes(lowerQuery) ||
    n.benefits.some(b => b.toLowerCase().includes(lowerQuery))
  );
}

