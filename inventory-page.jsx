import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '../lib/queryClient';
import { formatDate, getExpiryStatus } from '../lib/utils';
import toast from 'react-hot-toast';

export default function InventoryPage() {
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showEditItemModal, setShowEditItemModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('expiryDate');
  
  // Form state for adding/editing items
  const [formData, setFormData] = useState({
    name: '',
    category: 'produce',
    quantity: 1,
    unit: 'unit',
    expiryDate: new Date().toISOString().split('T')[0],
    notes: ''
  });
  
  // Fetch inventory items
  const { data: inventoryItems = [], isLoading } = useQuery({
    queryKey: ['/api/inventory'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/inventory');
      return await res.json();
    }
  });
  
  // Add new item mutation
  const addItemMutation = useMutation({
    mutationFn: async (newItem) => {
      const res = await apiRequest('POST', '/inventory', newItem);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/inventory'] });
      setShowAddItemModal(false);
      resetForm();
      toast.success('Item added successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to add item');
    }
  });
  
  // Update item mutation
  const updateItemMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await apiRequest('PATCH', `/inventory/${id}`, data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/inventory'] });
      setShowEditItemModal(false);
      resetForm();
      toast.success('Item updated successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update item');
    }
  });
  
  // Delete item mutation
  const deleteItemMutation = useMutation({
    mutationFn: async (id) => {
      const res = await apiRequest('DELETE', `/inventory/${id}`);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/inventory'] });
      setShowDeleteModal(false);
      setCurrentItem(null);
      toast.success('Item deleted successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete item');
    }
  });
  
  // Mark item for donation mutation
  const markForDonationMutation = useMutation({
    mutationFn: async (id) => {
      const res = await apiRequest('POST', `/inventory/${id}/donate`);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/inventory'] });
      toast.success('Item marked for donation');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to mark item for donation');
    }
  });
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // Open add item modal
  const openAddItemModal = () => {
    resetForm();
    setShowAddItemModal(true);
  };
  
  // Open edit dialog
  const openEditDialog = (item) => {
    setCurrentItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      unit: item.unit,
      expiryDate: new Date(item.expiryDate).toISOString().split('T')[0],
      notes: item.notes || ''
    });
    setShowEditItemModal(true);
  };
  
  // Open delete dialog
  const openDeleteDialog = (item) => {
    setCurrentItem(item);
    setShowDeleteModal(true);
  };
  
  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      category: 'produce',
      quantity: 1,
      unit: 'unit',
      expiryDate: new Date().toISOString().split('T')[0],
      notes: ''
    });
  };
  
  // Submit form for add/edit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (showAddItemModal) {
      addItemMutation.mutate(formData);
    } else if (showEditItemModal && currentItem) {
      updateItemMutation.mutate({ id: currentItem.id, data: formData });
    }
  };
  
  // Handle mark for donation
  const handleMarkForDonation = (item) => {
    markForDonationMutation.mutate(item.id);
  };
  
  // Filter and sort inventory items
  const filteredItems = inventoryItems
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      if (sortBy === 'expiryDate') return new Date(a.expiryDate) - new Date(b.expiryDate);
      return 0;
    });
  
  // Get expiry status badge
  const getExpiryStatusBadge = (expiryDate) => {
    const status = getExpiryStatus(expiryDate);
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${status.bgColor} ${status.color}`}>
        {status.label}
      </span>
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Food Inventory</h1>
          <p className="text-muted-foreground">
            Keep track of your food items and expiry dates
          </p>
        </div>
        <button 
          onClick={openAddItemModal}
          className="bg-primary text-white px-4 py-2 rounded-md mt-4 md:mt-0 hover:bg-primary/90 transition"
        >
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Item
          </span>
        </button>
      </div>
      
      {/* Filters and Search */}
      <div className="bg-card rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium mb-1">
              Search Items
            </label>
            <div className="relative">
              <input
                id="search"
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border rounded-md pl-10"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1">
              Filter by Category
            </label>
            <select
              id="category"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="all">All Categories</option>
              <option value="produce">Produce</option>
              <option value="dairy">Dairy</option>
              <option value="meat">Meat</option>
              <option value="grains">Grains</option>
              <option value="canned">Canned Goods</option>
              <option value="frozen">Frozen</option>
              <option value="bakery">Bakery</option>
              <option value="beverages">Beverages</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="sortBy" className="block text-sm font-medium mb-1">
              Sort By
            </label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="expiryDate">Expiry Date (Soonest First)</option>
              <option value="name">Name (A-Z)</option>
              <option value="category">Category</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Inventory List */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredItems.length === 0 ? (
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
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <h3 className="text-xl font-medium mb-2">Your inventory is empty</h3>
          <p className="text-muted-foreground mb-4">
            Add some food items to get started with tracking your inventory
          </p>
          <button
            onClick={openAddItemModal}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition"
          >
            Add Your First Item
          </button>
        </div>
      ) : (
        <div className="bg-card rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left">Item</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Quantity</th>
                  <th className="px-4 py-3 text-left">Expiry Date</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} className="border-t border-border hover:bg-muted/50">
                    <td className="px-4 py-3">
                      <div className="font-medium">{item.name}</div>
                      {item.notes && (
                        <div className="text-sm text-muted-foreground">{item.notes}</div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="capitalize">{item.category}</span>
                    </td>
                    <td className="px-4 py-3">
                      {item.quantity} {item.unit}
                    </td>
                    <td className="px-4 py-3">{formatDate(item.expiryDate)}</td>
                    <td className="px-4 py-3">
                      {getExpiryStatusBadge(item.expiryDate)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleMarkForDonation(item)}
                          className="p-1 text-yellow-600 hover:text-yellow-800"
                          title="Mark for donation"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
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
                        </button>
                        <button
                          onClick={() => openEditDialog(item)}
                          className="p-1 text-blue-600 hover:text-blue-800"
                          title="Edit item"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => openDeleteDialog(item)}
                          className="p-1 text-red-600 hover:text-red-800"
                          title="Delete item"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Add Item Modal */}
      {showAddItemModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg shadow-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Add New Food Item</h2>
            </div>
            <form onSubmit={handleFormSubmit} className="p-4 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Item Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-1">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="produce">Produce</option>
                  <option value="dairy">Dairy</option>
                  <option value="meat">Meat</option>
                  <option value="grains">Grains</option>
                  <option value="canned">Canned Goods</option>
                  <option value="frozen">Frozen</option>
                  <option value="bakery">Bakery</option>
                  <option value="beverages">Beverages</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium mb-1">
                    Quantity *
                  </label>
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="unit" className="block text-sm font-medium mb-1">
                    Unit *
                  </label>
                  <select
                    id="unit"
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  >
                    <option value="unit">Unit</option>
                    <option value="kg">Kilogram (kg)</option>
                    <option value="g">Gram (g)</option>
                    <option value="lb">Pound (lb)</option>
                    <option value="oz">Ounce (oz)</option>
                    <option value="l">Liter (L)</option>
                    <option value="ml">Milliliter (ml)</option>
                    <option value="pack">Pack</option>
                    <option value="can">Can</option>
                    <option value="bottle">Bottle</option>
                    <option value="box">Box</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium mb-1">
                  Expiry Date *
                </label>
                <input
                  id="expiryDate"
                  name="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="notes" className="block text-sm font-medium mb-1">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Storage instructions, etc."
                ></textarea>
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddItemModal(false)}
                  className="px-4 py-2 border rounded-md hover:bg-muted transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
                  disabled={addItemMutation.isPending}
                >
                  {addItemMutation.isPending ? 'Adding...' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Edit Item Modal */}
      {showEditItemModal && currentItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg shadow-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Edit Food Item</h2>
            </div>
            <form onSubmit={handleFormSubmit} className="p-4 space-y-4">
              <div>
                <label htmlFor="edit-name" className="block text-sm font-medium mb-1">
                  Item Name *
                </label>
                <input
                  id="edit-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="edit-category" className="block text-sm font-medium mb-1">
                  Category *
                </label>
                <select
                  id="edit-category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="produce">Produce</option>
                  <option value="dairy">Dairy</option>
                  <option value="meat">Meat</option>
                  <option value="grains">Grains</option>
                  <option value="canned">Canned Goods</option>
                  <option value="frozen">Frozen</option>
                  <option value="bakery">Bakery</option>
                  <option value="beverages">Beverages</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="edit-quantity" className="block text-sm font-medium mb-1">
                    Quantity *
                  </label>
                  <input
                    id="edit-quantity"
                    name="quantity"
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="edit-unit" className="block text-sm font-medium mb-1">
                    Unit *
                  </label>
                  <select
                    id="edit-unit"
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  >
                    <option value="unit">Unit</option>
                    <option value="kg">Kilogram (kg)</option>
                    <option value="g">Gram (g)</option>
                    <option value="lb">Pound (lb)</option>
                    <option value="oz">Ounce (oz)</option>
                    <option value="l">Liter (L)</option>
                    <option value="ml">Milliliter (ml)</option>
                    <option value="pack">Pack</option>
                    <option value="can">Can</option>
                    <option value="bottle">Bottle</option>
                    <option value="box">Box</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="edit-expiryDate" className="block text-sm font-medium mb-1">
                  Expiry Date *
                </label>
                <input
                  id="edit-expiryDate"
                  name="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="edit-notes" className="block text-sm font-medium mb-1">
                  Notes
                </label>
                <textarea
                  id="edit-notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Storage instructions, etc."
                ></textarea>
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditItemModal(false)}
                  className="px-4 py-2 border rounded-md hover:bg-muted transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
                  disabled={updateItemMutation.isPending}
                >
                  {updateItemMutation.isPending ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && currentItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Delete Food Item</h2>
            </div>
            <div className="p-4">
              <p>
                Are you sure you want to delete <strong>{currentItem.name}</strong>?
                This action cannot be undone.
              </p>
            </div>
            <div className="p-4 bg-muted flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded-md hover:bg-card transition"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteItemMutation.mutate(currentItem.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                disabled={deleteItemMutation.isPending}
              >
                {deleteItemMutation.isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}