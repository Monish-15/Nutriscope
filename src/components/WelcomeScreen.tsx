
import React from 'react';
import { SparklesIcon } from './IconComponents';

export const WelcomeScreen: React.FC = () => {
  return (
    <div className="mt-8 p-8 bg-white rounded-xl shadow-lg border border-base-300 animate-fade-in text-center">
      <SparklesIcon className="mx-auto h-12 w-12 text-primary opacity-80" />
      <h2 className="mt-4 text-2xl font-bold text-neutral">Welcome to NutriScope</h2>
      <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
        Get detailed nutritional insights from any recipe. Simply type, paste, or upload an image of a recipe to get started.
      </p>
      
      <div className="mt-8 text-left grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-base-100 p-4 rounded-lg">
            <h3 className="font-semibold text-neutral">Try Pasting a Recipe</h3>
            <p className="mt-2 text-sm text-gray-500 bg-base-200 p-3 rounded-md font-mono">
                1 cup quinoa, rinsed<br/>
                2 cups vegetable broth<br/>
                1 can (15 oz) black beans, rinsed<br/>
                1 cup corn kernels<br/>
                1 red bell pepper, diced<br/>
                1/2 red onion, chopped<br/>
                1/4 cup cilantro, chopped<br/>
                Dressing: 3 tbsp olive oil, 2 tbsp lime juice, 1 tsp cumin, salt and pepper to taste.
            </p>
        </div>
        <div className="bg-base-100 p-4 rounded-lg">
            <h3 className="font-semibold text-neutral">Or Upload an Image</h3>
            <div className="mt-2 flex items-center justify-center bg-base-200 p-3 rounded-md h-full">
                <img src="https://picsum.photos/id/23/300/150" alt="example food" className="rounded-md object-cover"/>
            </div>
            <p className="text-xs text-center mt-2 text-gray-400">Upload a picture of a recipe card or a finished dish.</p>
        </div>
      </div>
    </div>
  );
};
