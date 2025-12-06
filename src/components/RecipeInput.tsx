
import React, { useState, useRef, useCallback } from 'react';
import { UploadIcon, XIcon, SparklesIcon } from './IconComponents';

interface RecipeInputProps {
  onAnalyze: (text: string, image: File | null) => void;
  isLoading: boolean;
  onReset: () => void;
  hasReport: boolean;
}

export const RecipeInput: React.FC<RecipeInputProps> = ({ onAnalyze, isLoading, onReset, hasReport }) => {
  const [text, setText] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = useCallback(() => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);
  
  const handleReset = useCallback(() => {
    setText('');
    removeImage();
    onReset();
  }, [removeImage, onReset]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!text && !image) {
      alert('Please provide a recipe text or an image.');
      return;
    }
    onAnalyze(text, image);
  };
  
  if (hasReport) {
      return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-base-300">
            <button
              onClick={handleReset}
              className="w-full bg-primary hover:bg-primary-focus text-primary-content font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105"
            >
              Analyze Another Recipe
            </button>
        </div>
      );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-base-300 transition-all duration-300">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your recipe here or describe a meal..."
            className="w-full h-40 p-4 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-shadow duration-200 resize-none"
            disabled={isLoading}
          />

          <div className="flex items-center justify-center text-sm text-gray-500">
            <span className="flex-grow border-t border-gray-300"></span>
            <span className="flex-shrink mx-4">OR UPLOAD AN IMAGE</span>
            <span className="flex-grow border-t border-gray-300"></span>
          </div>

          <div>
            {imagePreview ? (
              <div className="relative group">
                <img src={imagePreview} alt="Recipe preview" className="w-full h-auto max-h-64 object-contain rounded-lg" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1.5 hover:bg-black/75 transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Remove image"
                  disabled={isLoading}
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div
                className="border-2 border-dashed border-base-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                  disabled={isLoading}
                />
                <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={isLoading || (!text && !image)}
            className="w-full bg-primary hover:bg-primary-focus text-primary-content font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Analyzing...
              </>
            ) : (
                <>
                <SparklesIcon className="h-5 w-5 mr-2"/>
                Analyze Recipe
                </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
