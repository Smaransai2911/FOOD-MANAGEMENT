import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FoodItem, Donation } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Layout } from "@/components/layout";
import { DonationForm } from "@/components/forms/donation-form";
import { DonationItem } from "@/components/dashboard/donation-item";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { 
  Plus, 
  Heart, 
  ArrowDownUp,
  Loader2, 
  AlertCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export default function DonatePage() {
  const { toast } = useToast();
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [showDonationDetails, setShowDonationDetails] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  // Fetch food items available for donation
  const { data: foodItems, isLoading: isLoadingFoodItems } = useQuery<FoodItem[]>({
    queryKey: ["/api/food-items"],
    select: (data) => data.filter((item) => !item.isAvailableForDonation),
  });

  // Fetch donations
  const { data: donations, isLoading: isLoadingDonations } = useQuery<Donation[]>({
    queryKey: ["/api/donations"],
  });

  // Fetch donation items for selected donation
  const { data: donationItems, isLoading: isLoadingDonationItems } = useQuery({
    queryKey: ["/api/donations", selectedDonation?.id, "items"],
    enabled: !!selectedDonation,
  });

  // Create donation mutation
  const createDonationMutation = useMutation({
    mutationFn: async (formData: any) => {
      const donationData = {
        pickupDate: formData.pickupDate,
        pickupAddress: formData.pickupAddress,
        notes: formData.notes,
      };

      // Create donation
      const res = await apiRequest("POST", "/api/donations", donationData);
      const donation = await res.json();

      // Add donation items
      const items = formData.items
        .filter((item: any) => item.selected)
        .map((item: any) => ({
          foodItemId: item.foodItemId,
          quantity: item.quantity,
          donationId: donation.id,
        }));

      if (items.length > 0) {
        await apiRequest("POST", `/api/donations/${donation.id}/items`, { items });
      }

      return donation;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Donation created successfully",
      });
      setShowDonationForm(false);
      queryClient.invalidateQueries({ queryKey: ["/api/donations"] });
      queryClient.invalidateQueries({ queryKey: ["/api/food-items"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update donation status mutation
  const updateDonationStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await apiRequest("PUT", `/api/donations/${id}`, { status });
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Donation status updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/donations"] });
      setShowDonationDetails(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleCreateDonation = (formData: any) => {
    createDonationMutation.mutate(formData);
  };

  const handleViewDonation = (donation: Donation) => {
    setSelectedDonation(donation);
    setShowDonationDetails(true);
  };

  const handleUpdateStatus = (status: string) => {
    if (selectedDonation) {
      updateDonationStatusMutation.mutate({ id: selectedDonation.id, status });
    }
  };

  // Filter donations by status based on active tab
  const filteredDonations = donations
    ? donations.filter((donation) => {
        if (activeTab === "all") return true;
        return donation.status === activeTab;
      })
    : [];

  return (
    <Layout>
      <div className="py-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h2 className="text-2xl font-heading font-bold text-neutral-900">Donate Food</h2>
            <p className="mt-1 text-sm text-neutral-600">Share your surplus food with those in need</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Button 
              onClick={() => setShowDonationForm(true)}
              className="inline-flex items-center"
              disabled={isLoadingFoodItems || (foodItems && foodItems.length === 0)}
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Donation
            </Button>
          </div>
        </div>

        {/* Donation Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-neutral-500">
                Total Donations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoadingDonations ? (
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                ) : (
                  donations?.length || 0
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-neutral-500">
                Completed Donations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoadingDonations ? (
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                ) : (
                  donations?.filter(d => d.status === "completed").length || 0
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-neutral-500">
                Pending Donations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoadingDonations ? (
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                ) : (
                  donations?.filter(d => d.status === "pending" || d.status === "accepted").length || 0
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Food and Donations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Available Food Items */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Available for Donation</CardTitle>
              <CardDescription>
                Food items you can donate
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingFoodItems ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : foodItems && foodItems.length > 0 ? (
                <div className="space-y-4">
                  {foodItems.map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
                    >
                      <div>
                        <h4 className="font-medium text-neutral-900">{item.name}</h4>
                        <p className="text-sm text-neutral-500">
                          {item.quantity} {item.unit} • Expires {format(new Date(item.expiryDate), "MMM dd")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-neutral-900 mb-1">No items available</h3>
                  <p className="text-neutral-500 mb-4">
                    Add items to your inventory and mark them as available for donation
                  </p>
                  <Button variant="outline" onClick={() => window.location.href = "/inventory"}>
                    Go to Inventory
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Donations */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Your Donations</CardTitle>
              <CardDescription>
                Track and manage your donations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                defaultValue="all"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-5 mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="accepted">Accepted</TabsTrigger>
                  <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab}>
                  {isLoadingDonations ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : filteredDonations.length > 0 ? (
                    <div className="border rounded-md divide-y">
                      {filteredDonations.map((donation) => (
                        <DonationItem
                          key={donation.id}
                          donation={donation}
                          onClick={() => handleViewDonation(donation)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <AlertCircle className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-neutral-900 mb-1">No donations found</h3>
                      <p className="text-neutral-500 mb-4">
                        {activeTab === "all"
                          ? "You haven't made any donations yet"
                          : `You don't have any ${activeTab} donations`}
                      </p>
                      {activeTab === "all" && (
                        <Button onClick={() => setShowDonationForm(true)}>
                          Create Donation
                        </Button>
                      )}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Create Donation Dialog */}
      <DonationForm
        open={showDonationForm}
        onOpenChange={setShowDonationForm}
        onSubmit={handleCreateDonation}
        availableItems={foodItems || []}
        isLoading={createDonationMutation.isPending}
      />

      {/* Donation Details Dialog */}
      <Dialog open={showDonationDetails} onOpenChange={setShowDonationDetails}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Donation Details</DialogTitle>
            <DialogDescription>
              View the details of your donation
            </DialogDescription>
          </DialogHeader>
          
          {selectedDonation && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Status</h3>
                <Badge
                  className={
                    selectedDonation.status === "pending"
                      ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                      : selectedDonation.status === "accepted"
                      ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                      : selectedDonation.status === "scheduled"
                      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                      : selectedDonation.status === "completed"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : "bg-red-100 text-red-800 hover:bg-red-100"
                  }
                >
                  {selectedDonation.status.charAt(0).toUpperCase() + selectedDonation.status.slice(1)}
                </Badge>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Pickup Details</h3>
                <p className="text-sm">
                  <span className="font-medium">Date: </span>
                  {selectedDonation.pickupDate
                    ? format(new Date(selectedDonation.pickupDate), "MMMM dd, yyyy 'at' h:mm a")
                    : "Not scheduled yet"}
                </p>
                <p className="text-sm mt-1">
                  <span className="font-medium">Address: </span>
                  {selectedDonation.pickupAddress || "Not specified"}
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Notes</h3>
                <p className="text-sm">
                  {selectedDonation.notes || "No additional notes"}
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Items</h3>
                {isLoadingDonationItems ? (
                  <div className="flex justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : donationItems && donationItems.length > 0 ? (
                  <div className="border rounded-md divide-y">
                    {donationItems.map((item: any) => (
                      <div key={item.id} className="p-3 flex justify-between items-center">
                        <div>
                          <p className="font-medium">{item.foodItem.name}</p>
                          <p className="text-sm text-neutral-500">
                            {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-neutral-500">No items in this donation</p>
                )}
              </div>
              
              {selectedDonation.status !== "completed" && selectedDonation.status !== "cancelled" && (
                <div className="flex justify-end space-x-2 pt-4">
                  {selectedDonation.status === "pending" && (
                    <Button
                      variant="outline"
                      onClick={() => handleUpdateStatus("cancelled")}
                      disabled={updateDonationStatusMutation.isPending}
                    >
                      Cancel Donation
                    </Button>
                  )}
                  {selectedDonation.status === "scheduled" && (
                    <Button
                      onClick={() => handleUpdateStatus("completed")}
                      disabled={updateDonationStatusMutation.isPending}
                    >
                      Mark as Completed
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
