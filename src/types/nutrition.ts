export interface Vitamins {
  vitaminA?: number; // mcg RAE
  vitaminB1?: number; // mg (Thiamine)
  vitaminB2?: number; // mg (Riboflavin)
  vitaminB3?: number; // mg (Niacin)
  vitaminB6?: number; // mg
  vitaminB12?: number; // mcg
  vitaminC?: number; // mg
  vitaminD?: number; // mcg
  vitaminE?: number; // mg
  vitaminK?: number; // mcg
  folate?: number; // mcg
}

export interface Minerals {
  calcium?: number; // mg
  iron?: number; // mg
  magnesium?: number; // mg
  phosphorus?: number; // mg
  potassium?: number; // mg
  zinc?: number; // mg
  copper?: number; // mg
  manganese?: number; // mg
  selenium?: number; // mcg
}

export interface NutritionalData {
  calories?: number;
  protein?: number;
  carbohydrates?: number;
  fat?: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
  meal_type?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  food_items?: string[];
  description?: string;
  vitamins?: Vitamins;
  minerals?: Minerals;
}

export interface FoodAnalysisResult {
  imageUri: string;
  dateTime: Date;
  nutritionalData: NutritionalData;
}

