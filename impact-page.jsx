import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../lib/queryClient';
import { formatNumber } from '../lib/utils';

export default function ImpactPage() {
  const [timeRange, setTimeRange] = useState('month');
  
  // Fetch user's impact data
  const { data: userImpact, isLoading: isLoadingUserImpact } = useQuery({
    queryKey: ['/api/impact/user', timeRange],
    queryFn: async () => {
      const res = await apiRequest('GET', `/impact/user?timeRange=${timeRange}`);
      return await res.json();
    }
  });
  
  // Fetch community impact data
  const { data: communityImpact, isLoading: isLoadingCommunityImpact } = useQuery({
    queryKey: ['/api/impact/community'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/impact/community');
      return await res.json();
    }
  });
  
  // Sample environmental equivalents calculation
  const getEnvironmentalEquivalents = (wasteReducedKg) => {
    // Based on EPA and other environmental research
    const co2Reduction = wasteReducedKg * 2.5; // kg of CO2 equivalent
    const waterSaved = wasteReducedKg * 1000; // liters of water
    const landSaved = wasteReducedKg * 0.0001; // hectares of land
    
    return {
      co2Reduction,
      waterSaved,
      landSaved,
      carMiles: co2Reduction * 2.5, // miles not driven by average car
      showers: waterSaved / 100, // number of 10-minute showers
    };
  };
  
  // Calculate environmental impact if data exists
  const environmentalImpact = userImpact ? getEnvironmentalEquivalents(userImpact.wasteReducedKg) : null;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Impact</h1>
        <p className="text-muted-foreground">
          See how your actions are making a difference in reducing food waste
        </p>
      </div>
      
      {/* Time Range Selector */}
      <div className="bg-card rounded-lg shadow p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-md ${
              timeRange === 'week' 
                ? 'bg-primary text-white' 
                : 'bg-muted hover:bg-muted/80'
            }`}
            onClick={() => setTimeRange('week')}
          >
            This Week
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              timeRange === 'month' 
                ? 'bg-primary text-white' 
                : 'bg-muted hover:bg-muted/80'
            }`}
            onClick={() => setTimeRange('month')}
          >
            This Month
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              timeRange === 'year' 
                ? 'bg-primary text-white' 
                : 'bg-muted hover:bg-muted/80'
            }`}
            onClick={() => setTimeRange('year')}
          >
            This Year
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              timeRange === 'all' 
                ? 'bg-primary text-white' 
                : 'bg-muted hover:bg-muted/80'
            }`}
            onClick={() => setTimeRange('all')}
          >
            All Time
          </button>
        </div>
      </div>
      
      {/* User Impact Stats */}
      <div className="bg-card rounded-lg shadow p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Your Personal Impact</h2>
        
        {isLoadingUserImpact ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : !userImpact ? (
          <div className="text-center py-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-muted-foreground mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <h3 className="text-xl font-medium mb-2">No impact data yet</h3>
            <p className="text-muted-foreground mb-4">
              Start tracking your inventory and making donations to see your impact
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="/inventory"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
              >
                Update Inventory
              </a>
              <a
                href="/donate"
                className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary/10 transition"
              >
                Make a Donation
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-card border rounded-lg p-5 text-center">
                <h3 className="text-muted-foreground text-sm mb-1">Food Waste Reduced</h3>
                <p className="text-3xl font-bold text-primary mb-1">{formatNumber(userImpact.wasteReducedKg)} kg</p>
                <p className="text-sm text-muted-foreground">of food saved from landfill</p>
              </div>
              
              <div className="bg-card border rounded-lg p-5 text-center">
                <h3 className="text-muted-foreground text-sm mb-1">Donations Made</h3>
                <p className="text-3xl font-bold text-primary mb-1">{formatNumber(userImpact.donationsCount)}</p>
                <p className="text-sm text-muted-foreground">successful donations</p>
              </div>
              
              <div className="bg-card border rounded-lg p-5 text-center">
                <h3 className="text-muted-foreground text-sm mb-1">Items Donated</h3>
                <p className="text-3xl font-bold text-primary mb-1">{formatNumber(userImpact.itemsDonatedCount)}</p>
                <p className="text-sm text-muted-foreground">items given to those in need</p>
              </div>
              
              <div className="bg-card border rounded-lg p-5 text-center">
                <h3 className="text-muted-foreground text-sm mb-1">Money Saved</h3>
                <p className="text-3xl font-bold text-primary mb-1">${formatNumber(userImpact.moneySaved)}</p>
                <p className="text-sm text-muted-foreground">by reducing waste</p>
              </div>
            </div>
            
            {environmentalImpact && (
              <div className="mb-8">
                <h3 className="text-xl font-medium mb-4">Environmental Impact</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 rounded-lg p-4 flex items-center">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-green-800">CO2 Reduction</p>
                      <p className="text-lg font-bold text-green-700">{formatNumber(environmentalImpact.co2Reduction)} kg</p>
                      <p className="text-xs text-green-600">Equivalent to not driving {formatNumber(environmentalImpact.carMiles)} miles</p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 flex items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4M4 12s2-3 2-6m4 0h.01M14 6h.01M18 6h.01M14 12h.01M18 12h.01M22 12h.01M22 6h.01M22 18h.01M4 18h.01" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-blue-800">Water Saved</p>
                      <p className="text-lg font-bold text-blue-700">{formatNumber(environmentalImpact.waterSaved)} L</p>
                      <p className="text-xs text-blue-600">Equivalent to {formatNumber(environmentalImpact.showers)} showers</p>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 rounded-lg p-4 flex items-center">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-amber-800">Land Use Saved</p>
                      <p className="text-lg font-bold text-amber-700">{environmentalImpact.landSaved.toFixed(4)} ha</p>
                      <p className="text-xs text-amber-600">Land not needed for food production</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-primary/10 rounded-lg p-5">
              <h3 className="text-lg font-bold mb-2">Keep Going!</h3>
              <p className="mb-4">
                Your efforts are making a real difference. Continue tracking your inventory, 
                finding recipes for soon-to-expire items, and donating surplus food to improve your impact.
              </p>
              <div className="flex flex-wrap gap-3">
                <a 
                  href="/inventory" 
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition text-sm"
                >
                  Update Inventory
                </a>
                <a 
                  href="/recipes" 
                  className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary/10 transition text-sm"
                >
                  Find Recipes
                </a>
                <a 
                  href="/donate" 
                  className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary/10 transition text-sm"
                >
                  Make Donations
                </a>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Community Impact */}
      <div className="bg-card rounded-lg shadow p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Community Impact</h2>
        
        {isLoadingCommunityImpact ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : !communityImpact ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">
              Community impact data is currently unavailable
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-card border rounded-lg p-5 text-center">
                <h3 className="text-muted-foreground text-sm mb-1">Active Users</h3>
                <p className="text-3xl font-bold text-primary mb-1">{formatNumber(communityImpact.activeUsers)}</p>
                <p className="text-sm text-muted-foreground">people reducing waste</p>
              </div>
              
              <div className="bg-card border rounded-lg p-5 text-center">
                <h3 className="text-muted-foreground text-sm mb-1">Total Waste Reduced</h3>
                <p className="text-3xl font-bold text-primary mb-1">{formatNumber(communityImpact.totalWasteReducedKg)} kg</p>
                <p className="text-sm text-muted-foreground">of food saved from landfill</p>
              </div>
              
              <div className="bg-card border rounded-lg p-5 text-center">
                <h3 className="text-muted-foreground text-sm mb-1">Total Donations</h3>
                <p className="text-3xl font-bold text-primary mb-1">{formatNumber(communityImpact.totalDonationsCount)}</p>
                <p className="text-sm text-muted-foreground">successful donations</p>
              </div>
              
              <div className="bg-card border rounded-lg p-5 text-center">
                <h3 className="text-muted-foreground text-sm mb-1">Meals Provided</h3>
                <p className="text-3xl font-bold text-primary mb-1">{formatNumber(communityImpact.mealsProvided)}</p>
                <p className="text-sm text-muted-foreground">to those in need</p>
              </div>
            </div>
            
            <div className="bg-muted rounded-lg p-5">
              <h3 className="text-lg font-bold mb-4">Top Contributors</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-2 font-medium">Rank</th>
                      <th className="pb-2 font-medium">User</th>
                      <th className="pb-2 font-medium">Waste Reduced</th>
                      <th className="pb-2 font-medium">Donations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {communityImpact.topContributors?.map((contributor, index) => (
                      <tr key={contributor.id} className="hover:bg-muted/80">
                        <td className="py-3">{index + 1}</td>
                        <td className="py-3 font-medium">
                          {contributor.username} {contributor.isCurrentUser && <span className="text-primary">(You)</span>}
                        </td>
                        <td className="py-3">{formatNumber(contributor.wasteReducedKg)} kg</td>
                        <td className="py-3">{formatNumber(contributor.donationsCount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Badges and Achievements */}
      <div className="bg-card rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Your Achievements</h2>
        
        {isLoadingUserImpact ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : !userImpact || !userImpact.badges || userImpact.badges.length === 0 ? (
          <div className="text-center py-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-muted-foreground mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-medium mb-2">No achievements yet</h3>
            <p className="text-muted-foreground mb-4">
              Complete actions to earn badges and achievements
            </p>
            <a
              href="/education"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
            >
              Learn How to Earn Badges
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {userImpact.badges.map((badge) => (
              <div key={badge.id} className="bg-card border rounded-lg p-4 text-center">
                <div className={`w-16 h-16 mx-auto mb-2 rounded-full flex items-center justify-center ${
                  badge.unlocked 
                    ? 'bg-primary/20 text-primary' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {badge.icon ? (
                    <img src={badge.icon} alt={badge.name} className="w-10 h-10" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <h3 className={`font-medium ${badge.unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {badge.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {badge.unlocked 
                    ? `Unlocked on ${new Date(badge.unlockedAt).toLocaleDateString()}`
                    : badge.description
                  }
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}