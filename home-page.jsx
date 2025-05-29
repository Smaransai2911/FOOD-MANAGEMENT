import React from 'react';
import { Link } from 'wouter';
import { useAuth } from '../hooks/use-auth';
import { useQuery } from '@tanstack/react-query';

export default function HomePage() {
  const { user } = useAuth();
  
  // Get expiring food items (within next 5 days)
  const { data: expiringItems = [] } = useQuery({
    queryKey: ['/api/food-items/expiring?days=5'],
    enabled: !!user,
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to FoodSaver</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Manage your food inventory, reduce waste, and make a positive impact on the environment.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Inventory card */}
          <div className="bg-card text-card-foreground rounded-lg shadow-md overflow-hidden">
            <div className="bg-green-100 p-6">
              <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-medium mb-2">Inventory Management</h3>
              <p className="text-muted-foreground mb-4">
                Keep track of your food items, their expiry dates, and get notified when they're about to expire.
              </p>
              <Link href="/inventory">
                <a className="text-primary font-medium hover:underline">Go to Inventory →</a>
              </Link>
            </div>
          </div>

          {/* Recipes card */}
          <div className="bg-card text-card-foreground rounded-lg shadow-md overflow-hidden">
            <div className="bg-amber-100 p-6">
              <svg className="h-10 w-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13c-1.168-.776-2.754-1.253-4.5-1.253-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-medium mb-2">Recipe Suggestions</h3>
              <p className="text-muted-foreground mb-4">
                Get delicious recipe ideas based on what's in your inventory to use up ingredients before they expire.
              </p>
              <Link href="/recipes">
                <a className="text-primary font-medium hover:underline">Explore Recipes →</a>
              </Link>
            </div>
          </div>

          {/* Donations card */}
          <div className="bg-card text-card-foreground rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-100 p-6">
              <svg className="h-10 w-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-medium mb-2">Donate Surplus</h3>
              <p className="text-muted-foreground mb-4">
                Donate surplus food to local organizations and track your contributions to the community.
              </p>
              <Link href="/donate">
                <a className="text-primary font-medium hover:underline">Manage Donations →</a>
              </Link>
            </div>
          </div>
        </div>

        {/* Expiring soon section */}
        <div className="bg-card text-card-foreground rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <svg className="h-6 w-6 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Expiring Soon
          </h2>
          
          {expiringItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {expiringItems.map((item) => (
                <div key={item.id} className="border rounded-md p-4 flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Expires: {new Date(item.expiryDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm">
                      {item.quantity} {item.unit}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/recipes">
                      <a className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded hover:bg-amber-200">
                        Find Recipe
                      </a>
                    </Link>
                    <Link href="/donate">
                      <a className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200">
                        Donate
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              No items expiring in the next 5 days. Great job managing your inventory!
            </p>
          )}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-primary/10 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Impact Tracker</h2>
            <p className="mb-4">
              Track your contribution to reducing food waste and helping the community.
            </p>
            <Link href="/impact">
              <a className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 inline-block">
                View Your Impact
              </a>
            </Link>
          </div>
          
          <div className="bg-green-600/10 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Food Waste Education</h2>
            <p className="mb-4">
              Learn more about food waste and how you can help reduce it.
            </p>
            <Link href="/education">
              <a className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 inline-block">
                Learn More
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}