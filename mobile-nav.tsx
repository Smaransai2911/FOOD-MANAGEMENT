import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import {
  Home,
  Package2,
  Heart,
  BookOpen,
  Map,
  BarChart3,
  Info,
  Settings,
  LogOut,
} from "lucide-react";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { logoutMutation } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
    setIsOpen(false);
  };

  const routes = [
    {
      name: "Dashboard",
      path: "/",
      icon: <Home className="h-5 w-5 mr-3" />,
    },
    {
      name: "Food Inventory",
      path: "/inventory",
      icon: <Package2 className="h-5 w-5 mr-3" />,
    },
    {
      name: "Donate Food",
      path: "/donate",
      icon: <Heart className="h-5 w-5 mr-3" />,
    },
    {
      name: "Recipe Suggestions",
      path: "/recipes",
      icon: <BookOpen className="h-5 w-5 mr-3" />,
    },
    {
      name: "Donation Map",
      path: "/map",
      icon: <Map className="h-5 w-5 mr-3" />,
    },
    {
      name: "Education Hub",
      path: "/education",
      icon: <Info className="h-5 w-5 mr-3" />,
    },
    {
      name: "Impact Statistics",
      path: "/impact",
      icon: <BarChart3 className="h-5 w-5 mr-3" />,
    },
  ];

  return (
    <div className="md:hidden bg-white fixed top-0 inset-x-0 z-10 border-b border-neutral-200">
      <div className="flex items-center justify-between h-16 px-4">
        <Link href="/">
          <h1 className="text-xl font-heading font-bold text-primary-600 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            FoodSaver
          </h1>
        </Link>

        <button
          type="button"
          onClick={toggleMenu}
          className="p-2 rounded-md text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 focus:outline-none"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "px-2 pt-2 pb-3 space-y-1 sm:px-3",
          isOpen ? "block" : "hidden"
        )}
      >
        {routes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            onClick={() => setIsOpen(false)}
            className={cn(
              "flex items-center px-3 py-2 rounded-md text-base font-medium",
              route.path === location
                ? "bg-primary-50 text-primary-700"
                : "text-neutral-700 hover:bg-neutral-100"
            )}
          >
            {route.icon}
            {route.name}
          </Link>
        ))}
        <Link
          href="/settings"
          onClick={() => setIsOpen(false)}
          className={cn(
            "flex items-center px-3 py-2 rounded-md text-base font-medium",
            location === "/settings"
              ? "bg-primary-50 text-primary-700"
              : "text-neutral-700 hover:bg-neutral-100"
          )}
        >
          <Settings className="h-5 w-5 mr-3" />
          Settings
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
}
