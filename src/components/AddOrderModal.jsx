'use client';
import { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import { toast } from 'react-toastify'; 

export default function AddOrderModal({ isOpen, onClose, onAdd }) {
  const [menuItems, setMenuItems] = useState([]);
  const [formData, setFormData] = useState({
    tableNumber: '',
    items: [{ foodId: '', quantity: 1 }],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const menuItemsData = await api.getMenuItems();
        console.log('Fetched menuItems:', menuItemsData); // Debug
        setMenuItems(menuItemsData);
      } catch (error) {
        console.error('Error fetching menu items:', error);
        toast.error('Failed to load menu items');
      } finally {
        setLoading(false);
      }
    };
    if (isOpen) {
      fetchMenuItems();
    }
  }, [isOpen]);

  const handleAddItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { foodId: '', quantity: 1 }],
    }));
  };

  const handleRemoveItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleItemChange = (index, field, value) => {
    setFormData((prev) => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: field === 'quantity' ? parseInt(value) || 1 : value };
      return { ...prev, items: newItems };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || loading) return;
    setIsSubmitting(true);

    const tableNumber = parseInt(formData.tableNumber);
    if (!tableNumber || tableNumber < 1) {
      toast.error('Please enter a valid table number');
      setIsSubmitting(false);
      return;
    }

    if (formData.items.some((item) => !item.foodId || item.quantity < 1)) {
      toast.error('Please select valid items and quantities');
      setIsSubmitting(false);
      return;
    }

    try {
      const newOrder = {
        tableNumber,
        items: formData.items.map(item => ({
          foodId: item.foodId,
          quantity: item.quantity,
        })),
        status: 'Pending',
      };
      console.log('Submitting order:', newOrder); // Debug
      const result = await api.addOrder(newOrder);
      console.log('Order added:', result); // Debug
      onAdd(result);
      onClose();
      toast.success(`Order added successfully`);
      setFormData({ tableNumber: '', items: [{ foodId: '', quantity: 1 }] });
    } catch (error) {
      console.error('Error adding order:', error);
      toast.error('Failed to add order: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
          <p className="text-gray-700">Loading menu items...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      aria-label="Add order modal"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Add New Order</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Table Number</label>
            <input
              type="number"
              value={formData.tableNumber}
              onChange={(e) => setFormData({ ...formData, tableNumber: e.target.value })}
              min="1"
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Items</label>
            {formData.items.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <select
                  value={item.foodId}
                  onChange={(e) => handleItemChange(index, 'foodId', e.target.value)}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
                >
                  <option value="">Select Item</option>
                  {menuItems.map((menuItem) => (
                    <option key={menuItem._id} value={menuItem._id}>
                      {menuItem.name} (LKR {menuItem.price.toLocaleString()})
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                  min="1"
                  required
                  className="w-20 mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
                />
                {formData.items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddItem}
              className="text-blue-900 hover:text-blue-800"
            >
              + Add Item
            </button>
          </div>
          <div className="flex gap-4 mt-4 justify-end">
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 disabled:bg-blue-600"
            >
              {isSubmitting ? 'Adding...' : 'Add Order'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}