import React from 'react';
import { Sidebar } from './sidebar.jsx';
import { MobileNav } from './mobile-nav.jsx';
import { useIsMobile } from '../hooks/use-mobile.js';

export function Layout({ children }) {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      {isMobile ? <MobileNav /> : <Sidebar className="hidden md:block" />}
      <main className="flex-1 md:ml-64 p-4">
        {children}
      </main>
    </div>
  );
}