
import { Type } from "@google/genai";

export const NUTRITION_SCHEMA = {
    type: Type.OBJECT,
    properties: {
        recipeName: {
            type: Type.STRING,
            description: "A short, descriptive name for the recipe."
        },
        estimatedCalories: {
            type: Type.NUMBER,
            description: "Total estimated calories for the entire recipe."
        },
        summary: {
            type: Type.STRING,
            description: "A brief, one to two sentence summary of the recipe's nutritional profile."
        },
        macronutrients: {
            type: Type.OBJECT,
            properties: {
                protein: {
                    type: Type.OBJECT,
                    properties: {
                        amount: { type: Type.NUMBER },
                        unit: { type: Type.STRING, description: "e.g., 'g'" }
                    },
                    required: ["amount", "unit"]
                },
                carbohydrates: {
                    type: Type.OBJECT,
                    properties: {
                        amount: { type: Type.NUMBER },
                        unit: { type: Type.STRING, description: "e.g., 'g'" }
                    },
                    required: ["amount", "unit"]
                },
                fat: {
                    type: Type.OBJECT,
                    properties: {
                        amount: { type: Type.NUMBER },
                        unit: { type: Type.STRING, description: "e.g., 'g'" }
                    },
                    required: ["amount", "unit"]
                }
            },
            required: ["protein", "carbohydrates", "fat"]
        },
        micronutrients: {
            type: Type.ARRAY,
            description: "A list of key vitamins and minerals.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "e.g., 'Vitamin C', 'Iron'" },
                    amount: { type: Type.NUMBER },
                    unit: { type: Type.STRING, description: "e.g., 'mg', 'mcg'" },
                    percentOfDailyValue: { type: Type.NUMBER, description: "Estimated percentage of daily value, if available."}
                },
                required: ["name", "amount", "unit"]
            }
        },
        ingredientsBreakdown: {
            type: Type.ARRAY,
            description: "A breakdown of estimated nutrition for each major ingredient.",
            items: {
                type: Type.OBJECT,
                properties: {
                    ingredient: { type: Type.STRING, description: "Name of the ingredient as understood from the recipe." },
                    calories: { type: Type.NUMBER },
                    protein: { type: Type.NUMBER, description: "in grams" },
                    carbohydrates: { type: Type.NUMBER, description: "Total carbohydrates in grams" },
                    fat: { type: Type.NUMBER, description: "in grams" }
                },
                required: ["ingredient", "calories", "protein", "carbohydrates", "fat"]
            }
        }
    },
    required: ["recipeName", "estimatedCalories", "summary", "macronutrients", "micronutrients", "ingredientsBreakdown"]
};
