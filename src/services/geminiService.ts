
import { GoogleGenAI, GenerateContentResponse, Part } from "@google/genai";
import { NUTRITION_SCHEMA } from '../constants';
import type { NutritionReportData } from '../types';

const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_KEY) {
    throw new Error("VITE_API_KEY environment variable not set. Please create a .env file with your API key.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const fileToGenerativePart = async (file: File): Promise<Part> => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result.split(',')[1]);
            }
        };
        reader.readAsDataURL(file);
    });
    const data = await base64EncodedDataPromise;
    return {
        inlineData: {
            data,
            mimeType: file.type,
        },
    };
};

export const analyzeRecipe = async (text: string, image: File | null): Promise<NutritionReportData> => {
    const model = ai.models;

    const prompt = `
        You are an expert nutritionist. Your task is to analyze the provided recipe (text and/or image) and return a detailed nutritional analysis in JSON format.

        Recipe Text: "${text}"

        Instructions:
        1.  Identify all ingredients from the text and/or image. If both are provided, use the image as the primary reference.
        2.  Calculate the total estimated calories for the entire dish.
        3.  Provide a breakdown of macronutrients: protein, carbohydrates, and fat.
        4.  List key micronutrients (vitamins and minerals).
        5.  **This is the most critical step:** Create a nutritional breakdown for *every single ingredient* you can identify. For each one, estimate its calories, protein, carbohydrates, and fat in grams.
        6.  Write a brief summary of the recipe's nutritional profile.
        7.  Return the entire analysis strictly following the provided JSON schema. **The 'ingredientsBreakdown' array must be fully populated and must not be empty.**
    `;

    const parts: Part[] = [{ text: prompt }];

    if (image) {
        const imagePart = await fileToGenerativePart(image);
        parts.unshift(imagePart); // Put image first for model to see
    }
    
    try {
        const response: GenerateContentResponse = await model.generateContent({
            model: "gemini-2.5-flash",
            contents: { parts: parts },
            config: {
                responseMimeType: "application/json",
                responseSchema: NUTRITION_SCHEMA,
            },
        });

        let jsonText = response.text.trim();
        
        // Clean the response to ensure it's valid JSON by removing potential markdown fences.
        if (jsonText.startsWith('```json')) {
            jsonText = jsonText.slice(7, -3).trim();
        }

        const parsedData = JSON.parse(jsonText);

        // Final validation to ensure the critical array is not missing
        if (!parsedData.ingredientsBreakdown) {
            parsedData.ingredientsBreakdown = [];
        }
        
        return parsedData as NutritionReportData;

    } catch (error) {
        console.error("Gemini API call failed:", error);
        if(error instanceof Error && error.message.includes('400')){
            throw new Error("The request was invalid. The recipe might be too ambiguous to analyze. Please provide more detail and try again.");
        }
        throw new Error("Failed to get a valid nutritional analysis from the model.");
    }
};
