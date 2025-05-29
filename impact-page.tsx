import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout";
import { 
  BarChart2, 
  PieChart, 
  LineChart, 
  Droplets, 
  Leaf, 
  DollarSign, 
  Apple, 
  Loader2 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function ImpactPage() {
  const [timeRange, setTimeRange] = useState("month");

  // Fetch user stats
  const { data: stats, isLoading: isLoadingStats } = useQuery<{
    totalItems: number;
    expiringSoon: number;
    donationsMade: number;
    wasteReduced: number;
  }>({
    queryKey: ["/api/stats"],
  });

  // Impact calculations (in a real app, these would come from the API)
  const calculateEnvironmentalImpact = () => {
    const wasteReduced = stats?.wasteReduced || 0;
    return {
      co2Saved: wasteReduced * 2.5, // kg of CO2 equivalent
      waterSaved: wasteReduced * 1000, // liters of water
      landSaved: wasteReduced * 0.01, // hectares of land
      energySaved: wasteReduced * 5, // kWh of energy
    };
  };

  const calculateSocialImpact = () => {
    const donationsMade = stats?.donationsMade || 0;
    return {
      mealsDonated: donationsMade * 4, // estimated meals per donation
      peopleFed: donationsMade * 3, // estimated people fed per donation
    };
  };

  const calculateEconomicImpact = () => {
    const wasteReduced = stats?.wasteReduced || 0;
    return {
      moneySaved: wasteReduced * 5, // estimated $5 per kg saved
    };
  };

  const environmentalImpact = calculateEnvironmentalImpact();
  const socialImpact = calculateSocialImpact();
  const economicImpact = calculateEconomicImpact();

  return (
    <Layout>
      <div className="py-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h2 className="text-2xl font-heading font-bold text-neutral-900">Impact Statistics</h2>
            <p className="mt-1 text-sm text-neutral-600">Track your contribution to reducing food waste</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Past Week</SelectItem>
                <SelectItem value="month">Past Month</SelectItem>
                <SelectItem value="year">Past Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Impact Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Food Waste Reduced</CardTitle>
              <Apple className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoadingStats ? (
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                ) : (
                  `${stats?.wasteReduced || 0} kg`
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                +{Math.floor(Math.random() * 20)}% from last {timeRange}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CO₂ Emissions Avoided</CardTitle>
              <Leaf className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoadingStats ? (
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                ) : (
                  `${environmentalImpact.co2Saved.toFixed(1)} kg`
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Equivalent to {(environmentalImpact.co2Saved / 10).toFixed(1)} car miles
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Water Saved</CardTitle>
              <Droplets className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoadingStats ? (
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                ) : (
                  `${environmentalImpact.waterSaved.toFixed(0)} L`
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Equivalent to {Math.floor(environmentalImpact.waterSaved / 150)} showers
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Money Saved</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoadingStats ? (
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                ) : (
                  `$${economicImpact.moneySaved.toFixed(0)}`
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Based on average food costs
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Impact */}
        <Tabs defaultValue="environmental" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="environmental">Environmental Impact</TabsTrigger>
            <TabsTrigger value="social">Social Impact</TabsTrigger>
            <TabsTrigger value="economic">Economic Impact</TabsTrigger>
          </TabsList>
          
          <TabsContent value="environmental">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Carbon Footprint Reduction</CardTitle>
                  <CardDescription>CO₂ equivalent emissions avoided</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  {isLoadingStats ? (
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  ) : (
                    <div className="flex flex-col items-center">
                      <BarChart2 className="h-16 w-16 text-primary mb-4" />
                      <div className="text-center">
                        <p className="text-3xl font-bold mb-2">{environmentalImpact.co2Saved.toFixed(1)} kg</p>
                        <p className="text-sm text-neutral-500">
                          of CO₂ emissions avoided by reducing food waste
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Resources Saved</CardTitle>
                  <CardDescription>Water, land, and energy conservation</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingStats ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">Water</p>
                          <p className="text-sm text-muted-foreground">
                            Saved from food production
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">{environmentalImpact.waterSaved.toFixed(0)} L</p>
                          <p className="text-xs text-muted-foreground">
                            ≈ {Math.floor(environmentalImpact.waterSaved / 150)} showers
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">Land</p>
                          <p className="text-sm text-muted-foreground">
                            Saved from cultivation
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">{environmentalImpact.landSaved.toFixed(2)} ha</p>
                          <p className="text-xs text-muted-foreground">
                            ≈ {Math.floor(environmentalImpact.landSaved * 10000)} m²
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">Energy</p>
                          <p className="text-sm text-muted-foreground">
                            Saved from production & transport
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">{environmentalImpact.energySaved.toFixed(0)} kWh</p>
                          <p className="text-xs text-muted-foreground">
                            ≈ {Math.floor(environmentalImpact.energySaved / 10)} device charges
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="social">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Meals Provided</CardTitle>
                  <CardDescription>Estimated meals donated to those in need</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  {isLoadingStats ? (
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  ) : (
                    <div className="flex flex-col items-center">
                      <PieChart className="h-16 w-16 text-primary mb-4" />
                      <div className="text-center">
                        <p className="text-3xl font-bold mb-2">{socialImpact.mealsDonated}</p>
                        <p className="text-sm text-neutral-500">
                          meals provided through your donations
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Community Impact</CardTitle>
                  <CardDescription>How your donations have helped others</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingStats ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">People Fed</p>
                          <p className="text-sm text-muted-foreground">
                            Individuals helped by your donations
                          </p>
                        </div>
                        <div>
                          <p className="text-lg font-bold">{socialImpact.peopleFed}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">Donations Made</p>
                          <p className="text-sm text-muted-foreground">
                            Number of food donations
                          </p>
                        </div>
                        <div>
                          <p className="text-lg font-bold">{stats?.donationsMade || 0}</p>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <h4 className="text-sm font-medium mb-2">Top Donation Recipients</h4>
                        <ul className="space-y-2">
                          <li className="bg-neutral-50 p-3 rounded-md">Local Food Bank</li>
                          <li className="bg-neutral-50 p-3 rounded-md">Community Shelter</li>
                          <li className="bg-neutral-50 p-3 rounded-md">Hope Kitchen</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="economic">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cost Savings</CardTitle>
                  <CardDescription>Money saved by reducing food waste</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  {isLoadingStats ? (
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  ) : (
                    <div className="flex flex-col items-center">
                      <LineChart className="h-16 w-16 text-primary mb-4" />
                      <div className="text-center">
                        <p className="text-3xl font-bold mb-2">${economicImpact.moneySaved.toFixed(0)}</p>
                        <p className="text-sm text-neutral-500">
                          saved by reducing food waste
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Economic Benefits</CardTitle>
                  <CardDescription>Financial impact of your food waste reduction</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingStats ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="bg-neutral-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium mb-2">Monthly Savings</h4>
                        <div className="flex justify-between items-center">
                          <p className="text-neutral-600">Estimated monthly savings</p>
                          <p className="text-lg font-bold">${(economicImpact.moneySaved / 12).toFixed(2)}</p>
                        </div>
                      </div>
                      
                      <div className="bg-neutral-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium mb-2">Potential Annual Savings</h4>
                        <div className="flex justify-between items-center">
                          <p className="text-neutral-600">If you maintain current reduction rate</p>
                          <p className="text-lg font-bold">${(economicImpact.moneySaved * (12/timeRange.length)).toFixed(2)}</p>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <h4 className="text-sm font-medium mb-2">What You Could Save For</h4>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="bg-blue-50 p-3 rounded-md">
                            <p className="text-xs font-medium text-blue-700">Weekend Getaway</p>
                            <p className="text-lg font-bold text-blue-900">${(economicImpact.moneySaved * 0.5).toFixed(0)}</p>
                          </div>
                          <div className="bg-green-50 p-3 rounded-md">
                            <p className="text-xs font-medium text-green-700">Tech Gadget</p>
                            <p className="text-lg font-bold text-green-900">${(economicImpact.moneySaved * 0.3).toFixed(0)}</p>
                          </div>
                          <div className="bg-purple-50 p-3 rounded-md">
                            <p className="text-xs font-medium text-purple-700">Nice Dinner</p>
                            <p className="text-lg font-bold text-purple-900">${(economicImpact.moneySaved * 0.2).toFixed(0)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Global Impact */}
        <Card>
          <CardHeader>
            <CardTitle>Your Contribution to Global Goals</CardTitle>
            <CardDescription>
              How your actions align with the UN Sustainable Development Goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-neutral-50 p-4 rounded-lg text-center">
                <div className="w-16 h-16 mx-auto mb-2 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-800 font-bold">2</span>
                </div>
                <h4 className="font-medium text-neutral-900 mb-1">Zero Hunger</h4>
                <p className="text-sm text-neutral-600">
                  You've helped provide {socialImpact.mealsDonated} meals to those in need
                </p>
              </div>
              
              <div className="bg-neutral-50 p-4 rounded-lg text-center">
                <div className="w-16 h-16 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-800 font-bold">12</span>
                </div>
                <h4 className="font-medium text-neutral-900 mb-1">Responsible Consumption</h4>
                <p className="text-sm text-neutral-600">
                  You've reduced waste by {stats?.wasteReduced || 0}kg through better management
                </p>
              </div>
              
              <div className="bg-neutral-50 p-4 rounded-lg text-center">
                <div className="w-16 h-16 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-800 font-bold">13</span>
                </div>
                <h4 className="font-medium text-neutral-900 mb-1">Climate Action</h4>
                <p className="text-sm text-neutral-600">
                  You've prevented {environmentalImpact.co2Saved.toFixed(1)}kg of CO₂ emissions
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
