"use client";
import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { toast } from "react-toastify";

export default function AddOrderModal({ isOpen, onClose, onAdd }) {
  const [menuItems, setMenuItems] = useState([]);
  const [formData, setFormData] = useState({
    tableNumber: "",
    items: [{ foodId: "", quantity: 1 }],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const menuItemsData = await api.getMenuItems();
        console.log("Fetched menuItems:", menuItemsData); // Debug
        setMenuItems(menuItemsData);
      } catch (error) {
        console.error("Error fetching menu items:", error);
        toast.error("Failed to load menu items");
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
      items: [...prev.items, { foodId: "", quantity: 1 }],
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
      newItems[index] = {
        ...newItems[index],
        [field]: field === "quantity" ? parseInt(value) || 1 : value,
      };
      return { ...prev, items: newItems };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || loading) return;
    setIsSubmitting(true);

    const tableNumber = parseInt(formData.tableNumber);
    if (!tableNumber || tableNumber < 1) {
      toast.error("Please enter a valid table number");
      setIsSubmitting(false);
      return;
    }

    if (formData.items.some((item) => !item.foodId || item.quantity < 1)) {
      toast.error("Please select valid items and quantities");
      setIsSubmitting(false);
      return;
    }

    try {
      const newOrder = {
        tableNumber,
        items: formData.items.map((item) => ({
          foodId: item.foodId,
          quantity: item.quantity,
        })),
        status: "Pending",
      };
      console.log("Submitting order:", newOrder); // Debug
      const result = await api.addOrder(newOrder);
      console.log("Order added:", result); // Debug
      onAdd(result);
      onClose();
      toast.success(`Order added successfully`);
      setFormData({ tableNumber: "", items: [{ foodId: "", quantity: 1 }] });
    } catch (error) {
      console.error("Error adding order:", error);
      toast.error("Failed to add order: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div
  className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
  aria-label="Add order modal"
>
  <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto border border-gray-100">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold text-gray-800">Create New Order</h2>
      <button 
        onClick={onClose}
        className="text-gray-400 hover:text-gray-500 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Table Number
        </label>
        <input
          type="number"
          value={formData.tableNumber}
          onChange={(e) => setFormData({ ...formData, tableNumber: e.target.value })}
          min="1"
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Order Items
        </label>
        
        <div className="space-y-3">
          {formData.items.map((item, index) => (
            <div key={index} className="flex gap-3 items-start">
              <select
                value={item.foodId}
                onChange={(e) => handleItemChange(index, "foodId", e.target.value)}
                required
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
              >
                <option value="">Select menu item</option>
                {menuItems.map((menuItem) => (
                  <option key={menuItem._id} value={menuItem._id}>
                    {menuItem.name} (LKR {menuItem.price.toLocaleString()})
                  </option>
                ))}
              </select>
              
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                min="1"
                required
                className="w-20 px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
              />
              
              {formData.items.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                  aria-label="Remove item"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleAddItem}
          className="mt-3 flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add another item
        </button>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting || loading}
          className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 transition-colors font-medium flex items-center"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            "Place Order"
          )}
        </button>
      </div>
    </form>
  </div>
</div>
  );
}
