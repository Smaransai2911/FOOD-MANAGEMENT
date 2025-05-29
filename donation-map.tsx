import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { DonationLocation } from "@shared/schema";

interface DonationMapProps {
  locations: DonationLocation[];
}

export function DonationMap({ locations }: DonationMapProps) {
  // In a real application, this would initialize a map like Mapbox or Leaflet
  // For this prototype, we'll just display location information
  
  // Categorize locations by type
  const locationsByType = locations.reduce((acc, location) => {
    const type = location.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(location);
    return acc;
  }, {} as Record<string, DonationLocation[]>);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Donation Locations</CardTitle>
        <CardDescription>Places accepting food donations near you</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-neutral-100 h-64 sm:h-96 rounded-md relative flex items-center justify-center">
          <div className="text-center text-neutral-700 p-4">
            <MapPin className="h-12 w-12 mx-auto mb-2 text-primary-500" />
            <p className="text-lg font-medium">Interactive Map</p>
            <p className="text-sm mt-1">
              Showing {locations.length} donation {locations.length === 1 ? 'location' : 'locations'} nearby
            </p>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Food Banks */}
          <div className="bg-primary-50 p-3 rounded-md text-center">
            <p className="text-xs font-medium text-primary-600">Food Banks</p>
            <p className="text-lg font-heading font-bold text-primary-800">
              {locationsByType.food_bank?.length || 0}
            </p>
          </div>
          
          {/* Shelters */}
          <div className="bg-amber-50 p-3 rounded-md text-center">
            <p className="text-xs font-medium text-amber-600">Shelters</p>
            <p className="text-lg font-heading font-bold text-amber-800">
              {locationsByType.shelter?.length || 0}
            </p>
          </div>
          
          {/* Community Centers */}
          <div className="bg-blue-50 p-3 rounded-md text-center">
            <p className="text-xs font-medium text-blue-600">Community Centers</p>
            <p className="text-lg font-heading font-bold text-blue-800">
              {locationsByType.community_center?.length || 0}
            </p>
          </div>
          
          {/* Schools */}
          <div className="bg-purple-50 p-3 rounded-md text-center">
            <p className="text-xs font-medium text-purple-600">Schools</p>
            <p className="text-lg font-heading font-bold text-purple-800">
              {locationsByType.school?.length || 0}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
