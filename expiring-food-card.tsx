import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Share2, Utensils } from "lucide-react";
import { FoodItem } from "@shared/schema";
import { format, differenceInDays } from "date-fns";

interface ExpiringFoodCardProps {
  item: FoodItem;
  onDonate: (item: FoodItem) => void;
  onRecipe: (item: FoodItem) => void;
}

export function ExpiringFoodCard({ item, onDonate, onRecipe }: ExpiringFoodCardProps) {
  const daysUntilExpiry = differenceInDays(new Date(item.expiryDate), new Date());
  
  let expiryTag = {
    text: `Expires in ${daysUntilExpiry} days`,
    color: "bg-yellow-500",
  };
  
  if (daysUntilExpiry <= 1) {
    expiryTag = {
      text: daysUntilExpiry === 0 ? "Expires today" : "Expires tomorrow",
      color: "bg-orange-500",
    };
  } else if (daysUntilExpiry <= 3) {
    expiryTag = {
      text: `Expires in ${daysUntilExpiry} days`,
      color: "bg-red-500",
    };
  }

  return (
    <div className="bg-white border border-neutral-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all card-hover">
      <div className="h-40 bg-neutral-200 relative">
        {/* Apply a placeholder gradient background if no image */}
        <div className={`w-full h-full ${!item.imageUrl ? 'bg-gradient-to-r from-primary-50 to-secondary-50' : ''}`}>
          {item.imageUrl && (
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          )}
          {!item.imageUrl && (
            <div className="flex items-center justify-center h-full">
              <span className="text-4xl">{item.name.charAt(0)}</span>
            </div>
          )}
        </div>
        <div className={`absolute top-2 right-2 ${expiryTag.color} text-white text-xs font-medium px-2 py-1 rounded-full`}>
          {expiryTag.text}
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-medium text-neutral-900">{item.name}</h4>
        <p className="text-sm text-neutral-500 mt-1">
          Quantity: {item.quantity} {item.unit}
        </p>
        <div className="mt-4 flex justify-between">
          <Button
            size="sm"
            variant="default"
            className="flex items-center"
            onClick={() => onDonate(item)}
          >
            <Share2 className="h-4 w-4 mr-1" />
            Donate
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex items-center"
            onClick={() => onRecipe(item)}
          >
            <Utensils className="h-4 w-4 mr-1" />
            Recipe
          </Button>
        </div>
      </div>
    </div>
  );
}
