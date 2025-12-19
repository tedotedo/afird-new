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
  {
    id: 'vitamin-b2',
    name: 'Vitamin B2 (Riboflavin)',
    category: 'vitamin',
    unit: 'mg',
    function: 'Essential for energy production, cell function, and metabolism of fats, drugs, and steroids.',
    benefits: [
      'Converts food into energy',
      'Supports healthy skin and eyes',
      'Maintains nervous system function',
      'Promotes growth and development',
      'Acts as an antioxidant',
      'Supports red blood cell production'
    ],
    foodSources: [
      'Milk and dairy products',
      'Eggs',
      'Lean meats',
      'Green leafy vegetables',
      'Fortified cereals',
      'Almonds',
      'Mushrooms'
    ],
    deficiencySymptoms: [
      'Cracked lips and mouth corners',
      'Sore throat',
      'Red, swollen tongue',
      'Skin rashes',
      'Anemia',
      'Light sensitivity'
    ],
    childrenInfo: 'Important for children\'s energy production, growth, and vision. Supports healthy skin and tissue repair.',
    absorptionTips: [
      'Better absorbed with food',
      'Light destroys riboflavin, store foods in dark containers',
      'Alcohol interferes with absorption'
    ],
    interactions: [
      'Works with other B vitamins for energy',
      'May be depleted by some medications',
      'Supports iron utilization'
    ],
    links: [
      {
        label: 'Riboflavin Fact Sheet',
        url: 'https://ods.od.nih.gov/factsheets/Riboflavin-Consumer/',
        source: 'NIH'
      }
    ]
  },
  {
    id: 'vitamin-b3',
    name: 'Vitamin B3 (Niacin)',
    category: 'vitamin',
    unit: 'mg',
    function: 'Converts food into energy and helps maintain healthy skin, nerves, and digestive system.',
    benefits: [
      'Converts food into energy',
      'Supports nervous system health',
      'Maintains healthy skin',
      'Supports digestive system',
      'May improve cholesterol levels',
      'Supports DNA repair'
    ],
    foodSources: [
      'Poultry and meat',
      'Fish (tuna, salmon)',
      'Whole grains',
      'Fortified cereals',
      'Peanuts',
      'Mushrooms',
      'Brown rice',
      'Avocado'
    ],
    deficiencySymptoms: [
      'Fatigue and weakness',
      'Digestive issues',
      'Skin problems',
      'Headaches',
      'Memory loss',
      'Pellagra (severe deficiency)'
    ],
    excessSymptoms: [
      'Skin flushing',
      'Liver damage (high doses)',
      'Stomach upset',
      'Dizziness'
    ],
    childrenInfo: 'Essential for children\'s energy production, nervous system development, and digestive health.',
    absorptionTips: [
      'Can be made from tryptophan (amino acid)',
      'Take with food to reduce flushing',
      'Alcohol interferes with absorption'
    ],
    interactions: [
      'May interact with diabetes medications',
      'Can affect blood clotting medications',
      'Works with other B vitamins'
    ],
    links: [
      {
        label: 'Niacin Fact Sheet',
        url: 'https://ods.od.nih.gov/factsheets/Niacin-Consumer/',
        source: 'NIH'
      }
    ]
  },
  {
    id: 'vitamin-b6',
    name: 'Vitamin B6 (Pyridoxine)',
    category: 'vitamin',
    unit: 'mg',
    function: 'Essential for brain development, immune function, and protein metabolism.',
    benefits: [
      'Supports brain development and function',
      'Helps make neurotransmitters',
      'Boosts immune function',
      'Metabolizes proteins',
      'Forms red blood cells',
      'Supports mood regulation'
    ],
    foodSources: [
      'Chickpeas',
      'Poultry and fish',
      'Potatoes',
      'Bananas',
      'Fortified cereals',
      'Beef liver',
      'Spinach',
      'Nuts'
    ],
    deficiencySymptoms: [
      'Anemia',
      'Weakened immune system',
      'Confusion',
      'Depression',
      'Skin rashes',
      'Cracked lips'
    ],
    excessSymptoms: [
      'Nerve damage (very high doses)',
      'Numbness',
      'Loss of muscle control',
      'Skin lesions'
    ],
    childrenInfo: 'Critical for children\'s brain development, immune function, and behavior. Supports learning and mood.',
    absorptionTips: [
      'Better absorbed from animal sources',
      'Cooking can destroy B6',
      'Take with other B vitamins'
    ],
    interactions: [
      'May reduce effectiveness of some medications',
      'Works with B12 and folate',
      'Alcohol depletes B6'
    ],
    links: [
      {
        label: 'Vitamin B6 Fact Sheet',
        url: 'https://ods.od.nih.gov/factsheets/VitaminB6-Consumer/',
        source: 'NIH'
      }
    ]
  },
  {
    id: 'vitamin-e',
    name: 'Vitamin E',
    category: 'vitamin',
    unit: 'mg',
    function: 'Powerful antioxidant that protects cells from damage and supports immune function.',
    benefits: [
      'Acts as powerful antioxidant',
      'Protects cells from damage',
      'Supports immune function',
      'Promotes healthy skin',
      'Supports eye health',
      'May slow cognitive decline'
    ],
    foodSources: [
      'Vegetable oils (sunflower, safflower)',
      'Nuts and seeds',
      'Spinach and broccoli',
      'Fortified cereals',
      'Avocado',
      'Peanut butter',
      'Kiwi',
      'Mango'
    ],
    deficiencySymptoms: [
      'Muscle weakness',
      'Vision problems',
      'Immune system problems',
      'Numbness and tingling',
      'Difficulty walking'
    ],
    excessSymptoms: [
      'Increased bleeding risk',
      'Nausea',
      'Diarrhea',
      'Fatigue'
    ],
    childrenInfo: 'Supports children\'s immune function and protects growing cells from damage. Important for nervous system development.',
    absorptionTips: [
      'Fat-soluble, absorb better with dietary fat',
      'Take with meals containing fat',
      'Vitamin C helps regenerate vitamin E'
    ],
    interactions: [
      'May increase bleeding risk with blood thinners',
      'Works with vitamin C and selenium',
      'High doses may interfere with vitamin K'
    ],
    links: [
      {
        label: 'Vitamin E Fact Sheet',
        url: 'https://ods.od.nih.gov/factsheets/VitaminE-Consumer/',
        source: 'NIH'
      }
    ]
  },
  {
    id: 'vitamin-k',
    name: 'Vitamin K',
    category: 'vitamin',
    unit: 'mcg',
    function: 'Essential for blood clotting and bone health. Helps wounds heal properly.',
    benefits: [
      'Essential for blood clotting',
      'Supports bone health',
      'Promotes wound healing',
      'May support heart health',
      'Helps prevent excessive bleeding',
      'Supports calcium regulation'
    ],
    foodSources: [
      'Leafy green vegetables (kale, spinach)',
      'Broccoli',
      'Brussels sprouts',
      'Cabbage',
      'Fish',
      'Meat',
      'Eggs',
      'Fermented foods (natto)'
    ],
    deficiencySymptoms: [
      'Easy bruising',
      'Excessive bleeding',
      'Heavy menstrual bleeding',
      'Blood in urine or stool',
      'Weak bones'
    ],
    childrenInfo: 'Important for children\'s bone development and blood clotting. Newborns typically receive vitamin K at birth.',
    absorptionTips: [
      'Fat-soluble, absorb better with dietary fat',
      'Eat leafy greens with olive oil or butter',
      'Gut bacteria produce some vitamin K'
    ],
    interactions: [
      'May interfere with blood thinning medications',
      'Works with vitamin D and calcium for bones',
      'Antibiotics may reduce vitamin K production'
    ],
    links: [
      {
        label: 'Vitamin K Fact Sheet',
        url: 'https://ods.od.nih.gov/factsheets/VitaminK-Consumer/',
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
  {
    id: 'magnesium',
    name: 'Magnesium',
    category: 'mineral',
    unit: 'mg',
    function: 'Essential for muscle and nerve function, blood sugar control, blood pressure regulation, and bone health.',
    benefits: [
      'Supports muscle and nerve function',
      'Regulates blood pressure',
      'Controls blood sugar levels',
      'Maintains strong bones',
      'Supports heart health',
      'Promotes relaxation and sleep',
      'Reduces anxiety and stress'
    ],
    foodSources: [
      'Leafy green vegetables',
      'Nuts and seeds',
      'Whole grains',
      'Legumes',
      'Avocado',
      'Dark chocolate',
      'Bananas',
      'Fatty fish'
    ],
    deficiencySymptoms: [
      'Muscle cramps and spasms',
      'Fatigue',
      'Weakness',
      'Anxiety',
      'Irregular heartbeat',
      'Numbness and tingling',
      'Loss of appetite'
    ],
    excessSymptoms: [
      'Diarrhea',
      'Nausea',
      'Stomach cramps',
      'Low blood pressure (very high doses)'
    ],
    childrenInfo: 'Important for children\'s bone development, muscle function, and nervous system. Supports growth and healthy sleep patterns.',
    absorptionTips: [
      'Better absorbed from whole foods than supplements',
      'Vitamin D enhances absorption',
      'Spread intake throughout day',
      'Avoid excessive calcium at same time'
    ],
    interactions: [
      'Works with calcium for bone health',
      'Vitamin D enhances absorption',
      'May interfere with certain antibiotics',
      'High calcium may reduce magnesium absorption'
    ],
    links: [
      {
        label: 'Magnesium Fact Sheet',
        url: 'https://ods.od.nih.gov/factsheets/Magnesium-Consumer/',
        source: 'NIH'
      }
    ]
  },
  {
    id: 'potassium',
    name: 'Potassium',
    category: 'mineral',
    unit: 'mg',
    function: 'Essential for heart function, muscle contractions, nerve signals, and fluid balance.',
    benefits: [
      'Maintains healthy blood pressure',
      'Supports heart function',
      'Regulates fluid balance',
      'Supports muscle contractions',
      'Promotes nerve function',
      'May reduce stroke risk',
      'Helps prevent kidney stones'
    ],
    foodSources: [
      'Bananas',
      'Sweet potatoes',
      'Spinach and leafy greens',
      'Beans and lentils',
      'Avocado',
      'Yogurt',
      'Salmon',
      'Tomatoes',
      'Oranges'
    ],
    deficiencySymptoms: [
      'Muscle weakness and cramps',
      'Fatigue',
      'Constipation',
      'Irregular heartbeat',
      'Numbness or tingling',
      'Difficulty breathing'
    ],
    excessSymptoms: [
      'Nausea',
      'Irregular heartbeat',
      'Muscle weakness',
      'Potentially dangerous for heart (severe excess)'
    ],
    childrenInfo: 'Critical for children\'s heart health, muscle function, and growth. Supports healthy blood pressure and nervous system.',
    absorptionTips: [
      'Best obtained from whole foods',
      'Cooking can reduce potassium in vegetables',
      'Maintain sodium-potassium balance',
      'Stay hydrated'
    ],
    interactions: [
      'Works with sodium for fluid balance',
      'Some medications affect potassium levels',
      'Kidney function affects potassium regulation'
    ],
    links: [
      {
        label: 'Potassium Fact Sheet',
        url: 'https://ods.od.nih.gov/factsheets/Potassium-Consumer/',
        source: 'NIH'
      },
      {
        label: 'Potassium and Heart Health',
        url: 'https://www.heart.org/en/health-topics/high-blood-pressure/changes-you-can-make-to-manage-high-blood-pressure/how-potassium-can-help-control-high-blood-pressure',
        source: 'CDC'
      }
    ]
  },
  {
    id: 'selenium',
    name: 'Selenium',
    category: 'mineral',
    unit: 'mcg',
    function: 'Essential for thyroid function, reproduction, and DNA synthesis. Acts as powerful antioxidant.',
    benefits: [
      'Supports thyroid function',
      'Acts as antioxidant',
      'Boosts immune system',
      'Supports reproduction',
      'May reduce cancer risk',
      'Protects against cell damage'
    ],
    foodSources: [
      'Brazil nuts (very high)',
      'Seafood',
      'Meat and poultry',
      'Eggs',
      'Whole grains',
      'Dairy products',
      'Sunflower seeds'
    ],
    deficiencySymptoms: [
      'Weakened immune system',
      'Fatigue',
      'Mental fog',
      'Hair loss',
      'Muscle weakness',
      'Thyroid problems'
    ],
    excessSymptoms: [
      'Nausea',
      'Hair loss',
      'Brittle nails',
      'Bad breath',
      'Nerve damage (severe excess)'
    ],
    childrenInfo: 'Important for children\'s thyroid function, immune system, and growth. Supports brain development.',
    absorptionTips: [
      'Just 1-2 Brazil nuts provide daily needs',
      'Better absorbed from animal sources',
      'Vitamin C may enhance absorption'
    ],
    interactions: [
      'Works with vitamin E as antioxidant',
      'May interact with chemotherapy drugs',
      'High doses of vitamin C may reduce absorption'
    ],
    links: [
      {
        label: 'Selenium Fact Sheet',
        url: 'https://ods.od.nih.gov/factsheets/Selenium-Consumer/',
        source: 'NIH'
      }
    ]
  },
  {
    id: 'iodine',
    name: 'Iodine',
    category: 'mineral',
    unit: 'mcg',
    function: 'Essential for thyroid hormone production, which regulates metabolism, growth, and development.',
    benefits: [
      'Supports thyroid function',
      'Regulates metabolism',
      'Supports brain development',
      'Promotes growth',
      'Maintains healthy skin',
      'Supports reproductive health'
    ],
    foodSources: [
      'Iodized salt',
      'Seafood and seaweed',
      'Dairy products',
      'Eggs',
      'Fortified bread',
      'Fish (cod, tuna)',
      'Shrimp'
    ],
    deficiencySymptoms: [
      'Goiter (enlarged thyroid)',
      'Hypothyroidism',
      'Fatigue',
      'Weight gain',
      'Dry skin',
      'Impaired brain development in children',
      'Mental slowness'
    ],
    excessSymptoms: [
      'Thyroid problems',
      'Nausea',
      'Stomach pain',
      'Metallic taste',
      'Rash'
    ],
    childrenInfo: 'Critical for children\'s brain development, growth, and thyroid function. Deficiency can cause intellectual disabilities and developmental delays.',
    absorptionTips: [
      'Use iodized salt in cooking',
      'Adequate but not excessive intake',
      'Some foods (soy, cruciferous vegetables) may interfere'
    ],
    interactions: [
      'Cruciferous vegetables may reduce iodine uptake',
      'Soy may interfere with thyroid function',
      'Iron deficiency may worsen iodine deficiency'
    ],
    links: [
      {
        label: 'Iodine Fact Sheet',
        url: 'https://ods.od.nih.gov/factsheets/Iodine-Consumer/',
        source: 'NIH'
      },
      {
        label: 'Iodine Deficiency',
        url: 'https://www.who.int/news-room/fact-sheets/detail/iodine-deficiency',
        source: 'WHO'
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
  },
  {
    id: 'carbohydrates',
    name: 'Carbohydrates',
    category: 'macronutrient',
    unit: 'g',
    function: 'Primary energy source for the body and brain. Broken down into glucose for immediate energy or stored for later use.',
    benefits: [
      'Provides primary energy for body and brain',
      'Fuels physical activity',
      'Supports brain function',
      'Spares protein for other uses',
      'Provides fiber (from complex carbs)',
      'Supports gut health'
    ],
    foodSources: [
      'Whole grains (oats, brown rice, quinoa)',
      'Fruits',
      'Vegetables',
      'Legumes',
      'Potatoes and sweet potatoes',
      'Bread and pasta',
      'Milk products'
    ],
    deficiencySymptoms: [
      'Fatigue and weakness',
      'Difficulty concentrating',
      'Headaches',
      'Nausea',
      'Dizziness',
      'Irritability'
    ],
    childrenInfo: 'Essential for children\'s energy, growth, and brain function. Children need adequate carbs for active play and learning.',
    absorptionTips: [
      'Choose complex carbs over simple sugars',
      'Combine with protein for sustained energy',
      'Eat whole grains for additional nutrients',
      'Spread intake throughout the day'
    ],
    interactions: [
      'Works with B vitamins for energy production',
      'Fiber slows sugar absorption',
      'Protein and fat slow carb digestion'
    ],
    links: [
      {
        label: 'Carbohydrates',
        url: 'https://www.hsph.harvard.edu/nutritionsource/carbohydrates/',
        source: 'Harvard Health'
      },
      {
        label: 'Carbohydrate Requirements',
        url: 'https://www.cdc.gov/nutrition/infantandtoddlernutrition/foods-and-drinks/grains.html',
        source: 'CDC'
      }
    ]
  },
  {
    id: 'omega-3',
    name: 'Omega-3 Fatty Acids',
    category: 'macronutrient',
    unit: 'g',
    function: 'Essential fats that reduce inflammation, support brain function, and promote heart health.',
    benefits: [
      'Supports brain development and function',
      'Reduces inflammation',
      'Promotes heart health',
      'Supports eye health',
      'May reduce depression and anxiety',
      'Supports healthy skin',
      'Important for pregnancy and early development'
    ],
    foodSources: [
      'Fatty fish (salmon, mackerel, sardines)',
      'Walnuts',
      'Flaxseeds and chia seeds',
      'Fish oil supplements',
      'Algae oil (vegan source)',
      'Hemp seeds',
      'Soybeans and tofu',
      'Fortified eggs'
    ],
    deficiencySymptoms: [
      'Dry, rough skin',
      'Poor concentration',
      'Fatigue',
      'Poor memory',
      'Heart problems',
      'Mood swings',
      'Poor circulation'
    ],
    childrenInfo: 'Critical for children\'s brain development, learning, behavior, and vision. Essential during pregnancy and early childhood.',
    absorptionTips: [
      'DHA and EPA from fish are most beneficial',
      'Plant sources (ALA) need conversion to DHA/EPA',
      'Take with meals containing fat',
      'Keep fish oil supplements refrigerated'
    ],
    interactions: [
      'May increase bleeding risk with blood thinners',
      'Works with vitamin E to prevent oxidation',
      'May enhance benefits of vitamin D'
    ],
    links: [
      {
        label: 'Omega-3 Fatty Acids Fact Sheet',
        url: 'https://ods.od.nih.gov/factsheets/Omega3FattyAcids-Consumer/',
        source: 'NIH'
      },
      {
        label: 'Omega-3 and Brain Health',
        url: 'https://www.hsph.harvard.edu/nutritionsource/what-should-you-eat/fats-and-cholesterol/types-of-fat/omega-3-fats/',
        source: 'Harvard Health'
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

