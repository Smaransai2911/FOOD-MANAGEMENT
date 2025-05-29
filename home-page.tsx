import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { FoodItem, Recipe } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Layout } from "@/components/layout";
import { StatsCard } from "@/components/dashboard/stats-card";
import { ExpiringFoodCard } from "@/components/dashboard/expiring-food-card";
import { RecipeCard } from "@/components/dashboard/recipe-card";
import { DonationItem } from "@/components/dashboard/donation-item";
import { DonationMap } from "@/components/dashboard/donation-map";
import { FoodItemForm } from "@/components/forms/food-item-form";
import { useToast } from "@/hooks/use-toast";
import { 
  Package2, 
  Clock, 
  Heart, 
  BarChart3, 
  Plus, 
  FilterX,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function HomePage() {
  const { toast } = useToast();
  const [showAddFoodItemDialog, setShowAddFoodItemDialog] = useState(false);
  const [showRecipeDialog, setShowRecipeDialog] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // Fetch user stats
  const { data: stats, isLoading: isLoadingStats } = useQuery<{
    totalItems: number;
    expiringSoon: number;
    donationsMade: number;
    wasteReduced: number;
  }>({
    queryKey: ["/api/stats"],
  });

  // Fetch expiring items
  const { data: expiringItems, isLoading: isLoadingExpiringItems } = useQuery<FoodItem[]>({
    queryKey: ["/api/food-items/expiring"],
  });

  // Fetch recipes
  const { data: recipes, isLoading: isLoadingRecipes } = useQuery<Recipe[]>({
    queryKey: ["/api/recipes"],
  });

  // Fetch recent donations
  const { data: donations, isLoading: isLoadingDonations } = useQuery({
    queryKey: ["/api/donations"],
  });

  // Fetch donation locations
  const { data: donationLocations, isLoading: isLoadingLocations } = useQuery({
    queryKey: ["/api/donation-locations"],
  });

  // Add food item mutation
  const addFoodItemMutation = useMutation({
    mutationFn: async (formData: Partial<FoodItem>) => {
      const res = await apiRequest("POST", "/api/food-items", formData);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Food item added successfully",
      });
      setShowAddFoodItemDialog(false);
      queryClient.invalidateQueries({ queryKey: ["/api/food-items"] });
      queryClient.invalidateQueries({ queryKey: ["/api/food-items/expiring"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Mark food as available for donation
  const markForDonationMutation = useMutation({
    mutationFn: async (itemId: number) => {
      const res = await apiRequest("PUT", `/api/food-items/${itemId}`, {
        isAvailableForDonation: true,
      });
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Item marked as available for donation",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/food-items"] });
      queryClient.invalidateQueries({ queryKey: ["/api/food-items/expiring"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleAddFoodItem = (formData: Partial<FoodItem>) => {
    addFoodItemMutation.mutate(formData);
  };

  const handleDonateClick = (item: FoodItem) => {
    markForDonationMutation.mutate(item.id);
    toast({
      description: "Redirecting to donation page...",
    });
    // Navigate to donation page
    window.location.href = "/donate";
  };

  const handleRecipeClick = (item: FoodItem) => {
    const matchingRecipes = recipes?.filter(recipe => 
      recipe.ingredients.toLowerCase().includes(item.name.toLowerCase())
    );
    
    if (matchingRecipes && matchingRecipes.length > 0) {
      setSelectedRecipe(matchingRecipes[0]);
      setShowRecipeDialog(true);
    } else {
      toast({
        title: "No Recipes Found",
        description: `We couldn't find recipes for ${item.name}. Try browsing all recipes.`,
        variant: "destructive",
      });
    }
  };

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setShowRecipeDialog(true);
  };

  return (
    <Layout>
      <div className="py-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h2 className="text-2xl font-heading font-bold text-neutral-900">Dashboard</h2>
            <p className="mt-1 text-sm text-neutral-600">View your impact and manage food resources</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button 
              onClick={() => setShowAddFoodItemDialog(true)}
              className="inline-flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Food Item
            </Button>
            
            <Button variant="outline" className="inline-flex items-center">
              <FilterX className="h-5 w-5 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {isLoadingStats ? (
            <div className="col-span-full flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <StatsCard 
                title="Total Food Items" 
                value={stats?.totalItems || 0} 
                icon={<Package2 className="h-6 w-6" />}
                iconBgColor="bg-primary-50"
                iconColor="text-primary-700"
                linkTo="/inventory"
                linkText="View all"
              />
              
              <StatsCard 
                title="Items Expiring Soon" 
                value={stats?.expiringSoon || 0} 
                icon={<Clock className="h-6 w-6" />}
                iconBgColor="bg-orange-50"
                iconColor="text-orange-700"
                linkTo="/inventory"
                linkText="Manage"
              />
              
              <StatsCard 
                title="Donations Made" 
                value={stats?.donationsMade || 0} 
                icon={<Heart className="h-6 w-6" />}
                iconBgColor="bg-green-50"
                iconColor="text-green-700"
                linkTo="/donate"
                linkText="View history"
              />
              
              <StatsCard 
                title="Waste Reduced (kg)" 
                value={stats?.wasteReduced || 0} 
                icon={<BarChart3 className="h-6 w-6" />}
                iconBgColor="bg-blue-50"
                iconColor="text-blue-700"
                linkTo="/impact"
                linkText="View impact"
              />
            </>
          )}
        </div>
        
        {/* Expiring Soon Section */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-heading font-medium text-neutral-900">Items Expiring Soon</h3>
              <p className="mt-1 max-w-2xl text-sm text-neutral-500">Take action before these items expire</p>
            </div>
            <Link href="/inventory" className="text-sm font-medium text-primary-700 hover:text-primary-900">
              View all
            </Link>
          </div>
          
          <div className="border-t border-neutral-200 px-4 py-5 sm:p-0">
            <div className="py-3 sm:px-6">
              {isLoadingExpiringItems ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : expiringItems && expiringItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {expiringItems.slice(0, 3).map((item) => (
                    <ExpiringFoodCard
                      key={item.id}
                      item={item}
                      onDonate={handleDonateClick}
                      onRecipe={handleRecipeClick}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-neutral-500">No items expiring soon. Great job managing your inventory!</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setShowAddFoodItemDialog(true)}
                  >
                    Add Items to Your Inventory
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Recipe Suggestions Section */}
        <div className="mb-8">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-lg font-heading font-medium text-neutral-900">Recipe Suggestions</h3>
            <Link href="/recipes" className="text-sm font-medium text-primary-700 hover:text-primary-900">
              View all recipes
            </Link>
          </div>
          
          {isLoadingRecipes ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : recipes && recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.slice(0, 3).map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  expiringItemsCount={
                    expiringItems
                      ? expiringItems.filter(item => 
                          recipe.ingredients.toLowerCase().includes(item.name.toLowerCase())
                        ).length
                      : 0
                  }
                  onClick={handleViewRecipe}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white rounded-lg shadow">
              <p className="text-neutral-500">No recipe suggestions available at the moment.</p>
            </div>
          )}
        </div>
        
        {/* Recent Donations & Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Recent Donations */}
          <div className="lg:col-span-2 bg-white shadow sm:rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-neutral-200">
              <h3 className="text-lg font-heading font-medium text-neutral-900">Recent Donations</h3>
              <p className="mt-1 max-w-2xl text-sm text-neutral-500">Your contributions to the community</p>
            </div>
            
            {isLoadingDonations ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : donations && donations.length > 0 ? (
              <div className="divide-y divide-neutral-200">
                {donations.slice(0, 3).map((donation) => (
                  <DonationItem key={donation.id} donation={donation} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-neutral-500">No donations made yet.</p>
                <Link href="/donate">
                  <Button variant="outline" className="mt-4">Start Donating</Button>
                </Link>
              </div>
            )}
            
            <div className="bg-neutral-50 px-4 py-4 sm:px-6 border-t border-neutral-200">
              <Link href="/donate" className="text-sm font-medium text-primary-700 hover:text-primary-900">
                View all donations
              </Link>
            </div>
          </div>
          
          {/* Map Section */}
          <div className="lg:col-span-3">
            {isLoadingLocations ? (
              <div className="flex justify-center py-8 bg-white shadow sm:rounded-lg">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : donationLocations && donationLocations.length > 0 ? (
              <DonationMap locations={donationLocations} />
            ) : (
              <div className="text-center py-8 bg-white shadow sm:rounded-lg">
                <p className="text-neutral-500">No donation locations available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Food Item Dialog */}
      <FoodItemForm
        open={showAddFoodItemDialog}
        onOpenChange={setShowAddFoodItemDialog}
        onSubmit={handleAddFoodItem}
        isLoading={addFoodItemMutation.isPending}
      />

      {/* Recipe Dialog */}
      <Dialog open={showRecipeDialog} onOpenChange={setShowRecipeDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedRecipe?.name}</DialogTitle>
            <DialogDescription>
              {selectedRecipe?.description}
            </DialogDescription>
          </DialogHeader>
          
          {selectedRecipe && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Preparation Time</h4>
                <p className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-neutral-500" />
                  {selectedRecipe.prepTime} minutes | 
                  <span className="ml-1 capitalize">{selectedRecipe.difficulty} difficulty</span>
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Ingredients</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedRecipe.ingredients.split(',').map((ingredient, index) => (
                    <li key={index} className="text-sm">{ingredient.trim()}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Instructions</h4>
                <div className="text-sm space-y-2">
                  {selectedRecipe.instructions.split('\n').map((step, index) => (
                    <p key={index}>{step}</p>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button onClick={() => setShowRecipeDialog(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
