
import React from 'react';
import type { NutritionReportData, Macronutrients, Micronutrient, IngredientBreakdown } from '../types';
import { ZapIcon, HeartIcon, BrainIcon, BoneIcon } from './IconComponents';

interface NutritionReportProps {
  data: NutritionReportData;
}

const StatCard: React.FC<{ label: string; value: string; unit: string; icon: React.ReactNode }> = ({ label, value, unit, icon }) => (
    <div className="flex-1 bg-base-100 p-4 rounded-lg shadow-sm border border-base-200 flex items-start space-x-4">
        <div className="bg-primary/10 text-primary rounded-full p-3">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-2xl font-bold text-neutral">
                {value} <span className="text-lg font-medium">{unit}</span>
            </p>
        </div>
    </div>
);

const MacronutrientDisplay: React.FC<{ macros: Macronutrients }> = ({ macros }) => (
    <div className="p-6 bg-white rounded-lg shadow-md border border-base-300">
        <h3 className="text-xl font-bold mb-4 text-neutral">Macronutrients</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="font-semibold text-blue-800">Protein</p>
                <p className="text-2xl font-bold text-blue-900">{macros.protein.amount.toFixed(1)}g</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="font-semibold text-orange-800">Carbohydrates</p>
                <p className="text-2xl font-bold text-orange-900">{macros.carbohydrates.amount.toFixed(1)}g</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="font-semibold text-yellow-800">Fat</p>
                <p className="text-2xl font-bold text-yellow-900">{macros.fat.amount.toFixed(1)}g</p>
            </div>
        </div>
    </div>
);

const MicronutrientList: React.FC<{ micros: Micronutrient[] }> = ({ micros }) => (
    <div className="p-6 bg-white rounded-lg shadow-md border border-base-300">
        <h3 className="text-xl font-bold mb-4 text-neutral">Vitamins & Minerals</h3>
        <ul className="space-y-2">
            {micros.slice(0, 10).map((micro, index) => (
                <li key={index} className="flex justify-between items-center text-sm p-2 rounded-md hover:bg-base-200">
                    <span className="font-medium text-gray-700">{micro.name}</span>
                    <span className="text-gray-600">{micro.amount.toFixed(1)} {micro.unit}</span>
                </li>
            ))}
        </ul>
         {micros.length > 10 && <p className="text-center text-sm mt-4 text-gray-500">...and more</p>}
    </div>
);

const IngredientTable: React.FC<{ ingredients: IngredientBreakdown[] }> = ({ ingredients }) => (
    <div className="p-6 bg-white rounded-lg shadow-md border border-base-300 overflow-x-auto">
        <h3 className="text-xl font-bold mb-4 text-neutral">Ingredient Breakdown</h3>
        <table className="w-full text-left text-sm">
            <thead className="bg-base-200 text-gray-600 uppercase">
                <tr>
                    <th className="p-3">Ingredient</th>
                    <th className="p-3 text-right">Calories</th>
                    <th className="p-3 text-right">Protein (g)</th>
                    <th className="p-3 text-right">Carbs (g)</th>
                    <th className="p-3 text-right">Fat (g)</th>
                </tr>
            </thead>
            <tbody className="text-black">
                {ingredients.map((item, index) => (
                    <tr key={index} className="border-b border-base-200 hover:bg-base-100">
                        <td className="p-3 font-medium capitalize">{item.ingredient}</td>
                        <td className="p-3 text-right">{item.calories.toFixed(0)}</td>
                        <td className="p-3 text-right">{item.protein.toFixed(1)}</td>
                        <td className="p-3 text-right">{item.carbohydrates.toFixed(1)}</td>
                        <td className="p-3 text-right">{item.fat.toFixed(1)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export const NutritionReport: React.FC<NutritionReportProps> = ({ data }) => {
  return (
    <div className="space-y-8 animate-slide-in">
        <div className="p-6 bg-white rounded-lg shadow-md border border-base-300 text-center">
            <h2 className="text-3xl font-extrabold text-primary mb-2">{data.recipeName}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{data.summary}</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
            <StatCard label="Total Calories" value={data.estimatedCalories.toFixed(0)} unit="kcal" icon={<ZapIcon className="h-6 w-6"/>} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <MacronutrientDisplay macros={data.macronutrients} />
            <MicronutrientList micros={data.micronutrients} />
        </div>

        <IngredientTable ingredients={data.ingredientsBreakdown} />
    </div>
  );
};
