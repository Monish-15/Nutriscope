
export interface Nutrient {
  amount: number;
  unit: string;
}

export interface Macronutrients {
  protein: Nutrient;
  carbohydrates: Nutrient;
  fat: Nutrient;
}

export interface Micronutrient {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyValue?: number;
}

export interface IngredientBreakdown {
    ingredient: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
}

export interface NutritionReportData {
  recipeName: string;
  estimatedCalories: number;
  summary: string;
  macronutrients: Macronutrients;
  micronutrients: Micronutrient[];
  ingredientsBreakdown: IngredientBreakdown[];
}
