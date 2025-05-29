import { Button } from "@/components/ui/button";
import { Clock, ChefHat } from "lucide-react";
import { Recipe } from "@shared/schema";

interface RecipeCardProps {
  recipe: Recipe;
  expiringItemsCount?: number;
  onClick?: (recipe: Recipe) => void;
}

export function RecipeCard({ recipe, expiringItemsCount = 0, onClick }: RecipeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-all card-hover">
      <div className="h-48 bg-neutral-200">
        {recipe.imageUrl ? (
          <img
            src={recipe.imageUrl}
            alt={`${recipe.name} recipe`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-r from-primary-50 to-secondary-50">
            <ChefHat className="h-12 w-12 text-primary-400" />
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h4 className="font-medium text-neutral-900">{recipe.name}</h4>
          {expiringItemsCount > 0 && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              Uses {expiringItemsCount} expiring {expiringItemsCount === 1 ? 'item' : 'items'}
            </span>
          )}
        </div>
        <p className="text-sm text-neutral-600 mt-2 line-clamp-2">
          {recipe.description}
        </p>
        <div className="mt-4 flex items-center text-xs text-neutral-500">
          <Clock className="h-4 w-4 mr-1" />
          {recipe.prepTime} mins
          <span className="mx-2">•</span>
          <ChefHat className="h-4 w-4 mr-1" />
          <span className="capitalize">{recipe.difficulty}</span>
        </div>
        <Button
          className="mt-4 w-full"
          onClick={() => onClick && onClick(recipe)}
        >
          View Recipe
        </Button>
      </div>
    </div>
  );
}
