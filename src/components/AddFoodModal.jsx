"use client";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddFoodModal({ isOpen, onClose, onAdd }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const newFood = {
      name: formData.get("name")?.trim(),
      description: formData.get("description")?.trim() || null,
      category: formData.get("category"),
      price: Number(formData.get("price")),
      rating: Number(formData.get("rating")) || 0,
      origin: formData.get("origin")?.trim() || null,
      preparationTime: Number(formData.get("preparationTime")) || null,
      availability: formData.get("availability") === "true",
      dietary: formData.get("dietary"),
      calories: Number(formData.get("calories")) || null,
      protein: Number(formData.get("protein")) || null,
      carbs: Number(formData.get("carbs")) || null,
      fats: Number(formData.get("fats")) || null,
      flavor: formData.get("flavor")?.trim() || null,
      spiceLevel: Number(formData.get("spiceLevel")) || null,
      ingredients:
        formData
          .get("ingredients")
          ?.trim()
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean) || [],
      servingSize: formData.get("servingSize")?.trim() || null,
      tags:
        formData
          .get("tags")
          ?.trim()
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean) || [],
      imageUrl: formData.get("imageUrl")?.trim() || null,
      model3DUrl: formData.get("model3DUrl")?.trim() || null,
    };

    // Basic validation
    if (!newFood.name) {
      toast.error("Name is required");
      setIsSubmitting(false);
      return;
    }
    if (!newFood.category) {
      toast.error("Category is required");
      setIsSubmitting(false);
      return;
    }
    if (!newFood.price || newFood.price <= 0) {
      toast.error("Price must be greater than 0");
      setIsSubmitting(false);
      return;
    }

    try {
      await onAdd(newFood);
      toast.success("Food item added successfully");
      onClose();
    } catch (err) {
      toast.error(`Failed to add food: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-[600px] max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Add New Food Item
        </h2>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <label className="text-sm text-gray-900 font-medium">
            Name
            <input
              type="text"
              name="name"
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
            />
          </label>
          <label className="text-sm text-gray-900 font-medium">
            Description
            <textarea
              name="description"
              rows="3"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
            />
          </label>
          <label className="text-sm text-gray-900 font-medium">
            Category
            <select
              name="category"
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
            >
              <option value="">Select Category</option>
              <option value="Main">Main</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Side">Side</option>
              <option value="Dessert">Dessert</option>
            </select>
          </label>
          <label className="text-sm text-gray-900 font-medium">
            Price (LKR)
            <input
              type="number"
              name="price"
              min="0"
              step="1"
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
            />
          </label>
          <label className="text-sm text-gray-900 font-medium">
            Rating (0-5)
            <input
              type="number"
              name="rating"
              min="0"
              max="5"
              step="0.1"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
            />
          </label>
          <label className="text-sm text-gray-900 font-medium">
            Origin
            <input
              type="text"
              name="origin"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
            />
          </label>
          <label className="text-sm text-gray-900 font-medium">
            Preparation Time (min)
            <input
              type="number"
              name="preparationTime"
              min="0"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
            />
          </label>
          <label className="text-sm text-gray-900 font-medium">
            Availability
            <select
              name="availability"
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
            >
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>
          </label>
          <label className="text-sm text-gray-900 font-medium">
            Dietary
            <select
              name="dietary"
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
            >
              <option value="Non-Vegetarian">Non-Vegetarian</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
            </select>
          </label>
          <label className="text-sm text-gray-900 font-medium">
            Calories
            <input
              type="number"
              name="calories"
              min="0"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
            />
          </label>
          <label className="text-sm text-gray-900 font-medium">
            Protein (g)
            <input
              type="number"
              name="protein"
              min="0"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
            />
          </label>
          <label className="text-sm text-gray-900 font-medium">
            Carbs (g)
            <input
              type="number"
              name="carbs"
              min="0"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
            />
          </label>
          <label className="text-sm text-gray-900 font-medium">
            Fats (g)
            <input
              type="number"
              name="fats"
              min="0"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
            />
          </label>
          <label className="text-sm text-gray-900 font-medium">
            Flavor
            <input
              type="text"
              name="flavor"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
            />
          </label>
          <label className="text-sm text-gray-900 font-medium">
            Spice Level (0-5)
            <input
              type="number"
              name="spiceLevel"
              min="0"
              max="5"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
            />
          </label>
          <label className="text-sm text-gray-900 font-medium">
            Ingredients (comma-separated)
            <input
              type="text"
              name="ingredients"
              placeholder="e.g., Dough, Cheese, Tomato"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
            />
          </label>
          <label className="text-sm text-gray-900 font-medium">
            Serving Size
            <input
              type="text"
              name="servingSize"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
            />
          </label>
          <label className="text-sm text-gray-900 font-medium">
            Tags (comma-separated)
            <input
              type="text"
              name="tags"
              placeholder="e.g., Italian, Spicy"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
            />
          </label>
          <label className="text-sm text-gray-900 font-medium">
            Image URL
            <input
              type="url"
              name="imageUrl"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
            />
          </label>
          <label className="text-sm text-gray-900 font-medium">
            3D Model URL
            <input
              type="url"
              name="model3DUrl"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
            />
          </label>
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-indigo-900 text-white rounded-md hover:bg-indigo-800 disabled:opacity-50"
            >
              {isSubmitting ? "Adding..." : "Add Food"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
