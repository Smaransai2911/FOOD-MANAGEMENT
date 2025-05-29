import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '../lib/queryClient';
import { formatDate } from '../lib/utils';
import toast from 'react-hot-toast';

export default function DonatePage() {
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showDonationDetailsModal, setShowDonationDetailsModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  
  // Form state for creating a donation
  const [formData, setFormData] = useState({
    recipientId: '',
    pickupDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    pickupTime: '12:00',
    notes: '',
    items: []
  });
  
  // Get donation locations
  const { data: donationLocations = [], isLoading: isLoadingLocations } = useQuery({
    queryKey: ['/api/donation-locations'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/donation-locations');
      return await res.json();
    }
  });
  
  // Get available items for donation
  const { data: availableItems = [], isLoading: isLoadingItems } = useQuery({
    queryKey: ['/api/inventory/available-for-donation'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/inventory/available-for-donation');
      return await res.json();
    }
  });
  
  // Get user's donations
  const { data: donations = [], isLoading: isLoadingDonations } = useQuery({
    queryKey: ['/api/donations'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/donations');
      return await res.json();
    }
  });
  
  // Create donation mutation
  const createDonationMutation = useMutation({
    mutationFn: async (donationData) => {
      const res = await apiRequest('POST', '/donations', donationData);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/donations'] });
      queryClient.invalidateQueries({ queryKey: ['/api/inventory/available-for-donation'] });
      setShowDonationModal(false);
      resetForm();
      toast.success('Donation created successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create donation');
    }
  });
  
  // Cancel donation mutation
  const cancelDonationMutation = useMutation({
    mutationFn: async (id) => {
      const res = await apiRequest('POST', `/donations/${id}/cancel`);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/donations'] });
      queryClient.invalidateQueries({ queryKey: ['/api/inventory/available-for-donation'] });
      setShowDonationDetailsModal(false);
      toast.success('Donation cancelled');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to cancel donation');
    }
  });
  
  // Toggle item selection in the form
  const toggleItemSelection = (item) => {
    const itemExists = formData.items.some(i => i.id === item.id);
    
    if (itemExists) {
      setFormData({
        ...formData,
        items: formData.items.filter(i => i.id !== item.id)
      });
    } else {
      setFormData({
        ...formData,
        items: [...formData.items, { id: item.id, quantity: item.quantity }]
      });
    }
  };
  
  // Handle input changes in form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // Reset form
  const resetForm = () => {
    setFormData({
      recipientId: '',
      pickupDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
      pickupTime: '12:00',
      notes: '',
      items: []
    });
  };
  
  // Open create donation modal
  const openDonationModal = () => {
    resetForm();
    setShowDonationModal(true);
  };
  
  // View donation details
  const handleViewDonation = (donation) => {
    setSelectedDonation(donation);
    setShowDonationDetailsModal(true);
  };
  
  // Submit form for creating a donation
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (formData.items.length === 0) {
      toast.error('Please select at least one item to donate');
      return;
    }
    
    const donationData = {
      ...formData,
      pickupDateTime: `${formData.pickupDate}T${formData.pickupTime}`
    };
    
    createDonationMutation.mutate(donationData);
  };
  
  // Get status badge based on donation status
  const getDonationStatusBadge = (status) => {
    let color = '';
    let bgColor = '';
    
    switch (status) {
      case 'pending':
        color = 'text-yellow-600';
        bgColor = 'bg-yellow-100';
        break;
      case 'confirmed':
        color = 'text-blue-600';
        bgColor = 'bg-blue-100';
        break;
      case 'completed':
        color = 'text-green-600';
        bgColor = 'bg-green-100';
        break;
      case 'cancelled':
        color = 'text-red-600';
        bgColor = 'bg-red-100';
        break;
      default:
        color = 'text-gray-600';
        bgColor = 'bg-gray-100';
    }
    
    return (
      <span className={`px-2 py-1 text-xs rounded-full capitalize ${bgColor} ${color}`}>
        {status}
      </span>
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Food Donations</h1>
          <p className="text-muted-foreground">
            Donate your surplus food to those in need
          </p>
        </div>
        <button 
          onClick={openDonationModal}
          className="bg-primary text-white px-4 py-2 rounded-md mt-4 md:mt-0 hover:bg-primary/90 transition"
          disabled={availableItems.length === 0}
        >
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
            Create Donation
          </span>
        </button>
      </div>
      
      {/* Instructions Card */}
      <div className="bg-card rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">How Food Donation Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 text-primary w-12 h-12 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="font-medium mb-2">1. Select Items</h3>
            <p className="text-muted-foreground">Choose food items from your inventory that you want to donate.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 text-primary w-12 h-12 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-medium mb-2">2. Schedule Pickup</h3>
            <p className="text-muted-foreground">Choose a recipient and schedule a date and time for pickup.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 text-primary w-12 h-12 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-medium mb-2">3. Complete Donation</h3>
            <p className="text-muted-foreground">The recipient will pick up your items and mark the donation as complete.</p>
          </div>
        </div>
      </div>
      
      {/* Donation History */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Your Donations</h2>
        
        {isLoadingDonations ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : donations.length === 0 ? (
          <div className="bg-card rounded-lg shadow p-8 text-center">
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
                d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
              />
            </svg>
            <h3 className="text-xl font-medium mb-2">No donations yet</h3>
            <p className="text-muted-foreground mb-4">
              Start donating your surplus food to help those in need
            </p>
            <button
              onClick={openDonationModal}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition"
              disabled={availableItems.length === 0}
            >
              Create Your First Donation
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {donations.map((donation) => (
              <div key={donation.id} className="bg-card rounded-lg shadow overflow-hidden">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">
                        Donation to {donation.recipientName}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(donation.pickupDateTime)} at {new Date(donation.pickupDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {getDonationStatusBadge(donation.status)}
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-sm mb-2">
                    <span className="font-medium">Items:</span> {donation.itemCount} items donated
                  </p>
                  
                  {donation.notes && (
                    <p className="text-sm mb-4">
                      <span className="font-medium">Notes:</span> {donation.notes}
                    </p>
                  )}
                  
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleViewDonation(donation)}
                      className="text-primary hover:text-primary/80 text-sm font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Donation Locations */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Donation Locations</h2>
        
        {isLoadingLocations ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : donationLocations.length === 0 ? (
          <div className="bg-card rounded-lg shadow p-6 text-center">
            <p className="text-muted-foreground">No donation locations available in your area yet.</p>
          </div>
        ) : (
          <div className="bg-card rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Type</th>
                    <th className="px-4 py-3 text-left">Address</th>
                    <th className="px-4 py-3 text-left">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {donationLocations.map((location) => (
                    <tr key={location.id} className="border-t border-border hover:bg-muted/50">
                      <td className="px-4 py-3 font-medium">{location.name}</td>
                      <td className="px-4 py-3 capitalize">{location.type}</td>
                      <td className="px-4 py-3">{location.address}</td>
                      <td className="px-4 py-3">
                        {location.phone && <div>{location.phone}</div>}
                        {location.email && <div className="text-sm">{location.email}</div>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      
      {/* Create Donation Modal */}
      {showDonationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg shadow-lg max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Create Donation</h2>
            </div>
            <form onSubmit={handleFormSubmit} className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="recipientId" className="block text-sm font-medium mb-1">
                    Recipient *
                  </label>
                  <select
                    id="recipientId"
                    name="recipientId"
                    value={formData.recipientId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  >
                    <option value="">Select a recipient</option>
                    {donationLocations.map(location => (
                      <option key={location.id} value={location.id}>
                        {location.name} ({location.type})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="pickupDate" className="block text-sm font-medium mb-1">
                      Pickup Date *
                    </label>
                    <input
                      id="pickupDate"
                      name="pickupDate"
                      type="date"
                      value={formData.pickupDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="pickupTime" className="block text-sm font-medium mb-1">
                      Pickup Time *
                    </label>
                    <input
                      id="pickupTime"
                      name="pickupTime"
                      type="time"
                      value={formData.pickupTime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="notes" className="block text-sm font-medium mb-1">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Special instructions for pickup, etc."
                ></textarea>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Select Items to Donate</h3>
                
                {isLoadingItems ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : availableItems.length === 0 ? (
                  <div className="bg-muted p-4 rounded-md text-center">
                    <p className="text-muted-foreground">
                      You don't have any items available for donation.
                    </p>
                    <a 
                      href="/inventory" 
                      className="text-primary font-medium mt-2 inline-block"
                    >
                      Go to inventory to mark items for donation
                    </a>
                  </div>
                ) : (
                  <div className="border rounded-md overflow-hidden">
                    <div className="overflow-y-auto max-h-60">
                      <table className="w-full">
                        <thead className="bg-muted text-muted-foreground">
                          <tr>
                            <th className="px-4 py-2 text-left">
                              <input
                                type="checkbox"
                                onChange={() => {
                                  if (formData.items.length === availableItems.length) {
                                    setFormData({ ...formData, items: [] });
                                  } else {
                                    setFormData({
                                      ...formData,
                                      items: availableItems.map(item => ({
                                        id: item.id,
                                        quantity: item.quantity
                                      }))
                                    });
                                  }
                                }}
                                checked={formData.items.length === availableItems.length && availableItems.length > 0}
                              />
                            </th>
                            <th className="px-4 py-2 text-left">Item</th>
                            <th className="px-4 py-2 text-left">Category</th>
                            <th className="px-4 py-2 text-left">Quantity</th>
                            <th className="px-4 py-2 text-left">Expiry</th>
                          </tr>
                        </thead>
                        <tbody>
                          {availableItems.map((item) => {
                            const isSelected = formData.items.some(i => i.id === item.id);
                            
                            return (
                              <tr 
                                key={item.id} 
                                className={`border-t border-border hover:bg-muted/50 ${isSelected ? 'bg-primary/5' : ''}`}
                                onClick={() => toggleItemSelection(item)}
                                style={{ cursor: 'pointer' }}
                              >
                                <td className="px-4 py-2">
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => toggleItemSelection(item)}
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                </td>
                                <td className="px-4 py-2 font-medium">{item.name}</td>
                                <td className="px-4 py-2 capitalize">{item.category}</td>
                                <td className="px-4 py-2">
                                  {item.quantity} {item.unit}
                                </td>
                                <td className="px-4 py-2">
                                  {formatDate(item.expiryDate)}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className="bg-muted p-2 text-sm">
                      Selected {formData.items.length} of {availableItems.length} items
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowDonationModal(false)}
                  className="px-4 py-2 border rounded-md hover:bg-muted transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
                  disabled={formData.items.length === 0 || createDonationMutation.isPending}
                >
                  {createDonationMutation.isPending ? 'Creating...' : 'Create Donation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Donation Details Modal */}
      {showDonationDetailsModal && selectedDonation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg shadow-lg max-w-xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">Donation Details</h2>
              <button 
                onClick={() => setShowDonationDetailsModal(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4">
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">Status</h3>
                  {getDonationStatusBadge(selectedDonation.status)}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Recipient</p>
                    <p>{selectedDonation.recipientName}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Pickup Date & Time</p>
                    <p>
                      {formatDate(selectedDonation.pickupDateTime)} at {' '}
                      {new Date(selectedDonation.pickupDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                
                {selectedDonation.notes && (
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground">Notes</p>
                    <p>{selectedDonation.notes}</p>
                  </div>
                )}
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Donated Items</h3>
                
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted text-muted-foreground">
                      <tr>
                        <th className="px-4 py-2 text-left">Item</th>
                        <th className="px-4 py-2 text-left">Category</th>
                        <th className="px-4 py-2 text-left">Quantity</th>
                        <th className="px-4 py-2 text-left">Expiry</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedDonation.items && selectedDonation.items.map((item) => (
                        <tr key={item.id} className="border-t border-border">
                          <td className="px-4 py-2 font-medium">{item.name}</td>
                          <td className="px-4 py-2 capitalize">{item.category}</td>
                          <td className="px-4 py-2">
                            {item.quantity} {item.unit}
                          </td>
                          <td className="px-4 py-2">
                            {formatDate(item.expiryDate)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {selectedDonation.status === 'pending' && (
                <div className="flex justify-end">
                  <button
                    onClick={() => cancelDonationMutation.mutate(selectedDonation.id)}
                    className="px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition"
                    disabled={cancelDonationMutation.isPending}
                  >
                    {cancelDonationMutation.isPending ? 'Cancelling...' : 'Cancel Donation'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}