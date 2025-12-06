
import React from 'react';
import { LeafIcon } from './IconComponents';

export const Header: React.FC = () => {
  return (
    <header className="bg-base-200/50 backdrop-blur-md sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <LeafIcon className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-neutral tracking-tight">
            NutriScope
          </h1>
        </div>
      </div>
    </header>
  );
};
