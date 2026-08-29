import React from 'react';
import Navigation from './Navigation';
import MobileNavigation from './MobileNavigation';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Navigation />
      <main className="flex-1 md:ml-[240px] mb-16 md:mb-0 p-4 md:p-8">
        {children}
      </main>
      <MobileNavigation />
    </div>
  );
}
