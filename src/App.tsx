
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { RecipeInput } from './components/RecipeInput';
import { NutritionReport } from './components/NutritionReport';
import { Spinner } from './components/Spinner';
import { analyzeRecipe } from './services/geminiService';
import type { NutritionReportData } from './types';
import { WelcomeScreen } from './components/WelcomeScreen';

const App: React.FC = () => {
  const [report, setReport] = useState<NutritionReportData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = useCallback(async (text: string, image: File | null) => {
    setIsLoading(true);
    setError(null);
    setReport(null);
    try {
      const result = await analyzeRecipe(text, image);
      setReport(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`Failed to analyze recipe: ${err.message}. Please try again.`);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setReport(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-base-100 text-neutral font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <RecipeInput onAnalyze={handleAnalysis} isLoading={isLoading} onReset={handleReset} hasReport={!!report} />

          {isLoading && (
            <div className="mt-8 flex flex-col items-center justify-center text-center">
              <Spinner />
              <p className="text-lg text-neutral mt-4 animate-pulse">Analyzing your recipe... this might take a moment.</p>
            </div>
          )}

          {error && (
            <div className="mt-8 p-4 bg-error/10 border border-error text-error rounded-lg animate-fade-in" role="alert">
              <p className="font-bold">Oops! Something went wrong.</p>
              <p>{error}</p>
            </div>
          )}
          
          {!isLoading && !report && !error && (
             <WelcomeScreen />
          )}

          {report && !isLoading && (
            <div className="mt-8 animate-fade-in">
              <NutritionReport data={report} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
