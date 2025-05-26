'use client';
import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { toast } from 'react-toastify';

export default function EditOrderModal({ isOpen, onClose, order, onUpdate }) {
  const [menuItems, setMenuItems] = useState([]);
  const [formData, setFormData] = useState({
    tableNumber: '',
    items: [],
    status: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const data = await api.getMenuItems();
        console.log('Fetched menuItems:', data); // Debug
        setMenuItems(data.filter((item) => item.availability));
      } catch (err) {
        console.error('Error fetching menu items:', err);
        toast.error('Failed to load menu items');
      }
    };
    fetchMenuItems();
  }, []);

  useEffect(() => {
    if (order) {
      setFormData({
        tableNumber: order.tableNumber || '',
        items: order.items.map((item) => ({ foodId: item.foodId, quantity: item.quantity })),
        status: order.status || '',
      });
    }
  }, [order]);

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
      newItems[index] = { ...newItems[index], [field]: field === 'quantity' ? Number(value) : value };
      return { ...prev, items: newItems };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError(null);

    if (!formData.tableNumber || formData.tableNumber < 1) {
      setError('Please enter a valid table number');
      setIsSubmitting(false);
      return;
    }
    if (formData.items.some((item) => !item.foodId || item.quantity < 1)) {
      setError('Please select valid items and quantities');
      setIsSubmitting(false);
      return;
    }
    if (!formData.status) {
      setError('Please select a valid status');
      setIsSubmitting(false);
      return;
    }

    try {
      if (!order._id || !/^[0-9a-fA-F]{24}$/.test(order._id)) {
        throw new Error('Invalid order ID format');
      }

      if (formData.status === 'Cancelled') {
        console.log('Deleting order with _id:', order._id); // Debug
        await api.deleteOrder(order._id);
        onUpdate({ _id: order._id, status: 'Cancelled' }); // Signal deletion
        toast.success('Order cancelled successfully');
        onClose();
      } else {
        const updatedOrder = {
          tableNumber: Number(formData.tableNumber),
          items: formData.items.map((item) => ({
            foodId: item.foodId,
            quantity: Number(item.quantity),
          })),
          status: formData.status,
        };
        console.log('Updating order with _id:', order._id, 'Data:', updatedOrder); // Debug
        const result = await api.updateOrder(order._id, updatedOrder);
        onUpdate({ ...result, _id: result._id });
        toast.success('Order updated successfully');
        onClose();
      }
    } catch (err) {
      console.error('Error updating order:', err);
      setError(`Failed to update order: ${err.message}`);
      toast.error(`Failed to update order: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !order) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      aria-label="Edit order modal"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Edit Order - {order._id}</h2>
        {error && (
          <div className="mb-4 p-4 rounded-md bg-red-100 text-red-700">{error}</div>
        )}
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
                      {menuItem.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                  min="1"
                  required
                  className="mt-1 p-2 border border-gray-300 rounded-md w-20 focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
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
              className="text-blue-900 hover:text-blue-800 cursor-pointer"
            >
              + Add Item
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
            >
              <option value="Pending">Pending</option>
              <option value="Preparing">Preparing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancel</option>
            </select>
          </div>
          <div className="flex gap-4 mt-4 justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 disabled:bg-blue-600"
            >
              {isSubmitting ? 'Updating...' : 'Update Order'}
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