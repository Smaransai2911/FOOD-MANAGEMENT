import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { MobileNav } from "./mobile-nav";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-neutral-100">
      {/* Sidebar - hidden on mobile */}
      <Sidebar />
      
      {/* Mobile Navigation - visible only on mobile */}
      <MobileNav />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto md:pt-0 pt-16 pb-4 px-4 md:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
