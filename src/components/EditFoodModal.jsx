"use client";
import { useState } from "react";
import { toast } from "react-toastify";

export default function EditFoodModal({ isOpen, onClose, onUpdate, food }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !food) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const updatedFood = {
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

    // Enhanced validation
    if (!updatedFood.name) {
      toast.error("Name is required");
      setIsSubmitting(false);
      return;
    }
    if (
      !updatedFood.category ||
      !["Main", "Breakfast", "Side", "Dessert"].includes(updatedFood.category)
    ) {
      toast.error("Please select a valid category");
      setIsSubmitting(false);
      return;
    }
    if (!updatedFood.price || updatedFood.price <= 0) {
      toast.error("Price must be greater than 0");
      setIsSubmitting(false);
      return;
    }
    if (
      !updatedFood.dietary ||
      !["Non-Vegetarian", "Vegetarian", "Vegan"].includes(updatedFood.dietary)
    ) {
      toast.error("Please select a valid dietary option");
      setIsSubmitting(false);
      return;
    }
    if (updatedFood.rating < 0 || updatedFood.rating > 5) {
      toast.error("Rating must be between 0 and 5");
      setIsSubmitting(false);
      return;
    }
    if (
      updatedFood.spiceLevel &&
      (updatedFood.spiceLevel < 0 || updatedFood.spiceLevel > 5)
    ) {
      toast.error("Spice level must be between 0 and 5");
      setIsSubmitting(false);
      return;
    }

    try {
      if (!food._id || !/^[0-9a-fA-F]{24}$/.test(food._id)) {
        throw new Error("Invalid food ID format");
      }
      console.log(
        "Submitting update for food _id:",
        food._id,
        "Data:",
        updatedFood
      ); // Debug log
      await onUpdate(food._id, updatedFood);
      toast.success("Food item updated successfully");
      onClose();
    } catch (err) {
      console.error("Update failed:", err);
      toast.error(`Failed to update food: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-[1000] p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-100">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Edit Food Item</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isSubmitting}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto max-h-[calc(90vh-120px)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Basic Information Column */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 mb-2">
                Basic Information
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={food.name || ""}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="3"
                  defaultValue={food.description || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  defaultValue={food.category || ""}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                >
                  <option value="">Select Category</option>
                  <option value="Main Courses">Main Courses</option>
                  <option value="Appetizers & Starters">
                    Appetizers & Starters
                  </option>
                  <option value="Salads">Salads</option>
                  <option value="Light Bites & Snacks">
                    Light Bites & Snacks
                  </option>
                  <option value="Desserts">Desserts</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Wine & Cocktails">Wine & Cocktails</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (LKR) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">
                      LKR
                    </span>
                    <input
                      type="number"
                      name="price"
                      min="0"
                      step="1"
                      defaultValue={food.price || 0}
                      required
                      className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating (0-5)
                  </label>
                  <input
                    type="number"
                    name="rating"
                    min="0"
                    max="5"
                    step="0.1"
                    defaultValue={food.rating || 0}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Details Column */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 mb-2">Details</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Origin
                  </label>
                  <input
                    type="text"
                    name="origin"
                    defaultValue={food.origin || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prep Time (min)
                  </label>
                  <input
                    type="number"
                    name="preparationTime"
                    min="0"
                    defaultValue={food.preparationTime || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Availability *
                  </label>
                  <select
                    name="availability"
                    defaultValue={food.availability?.toString() || "true"}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  >
                    <option value="true">Available</option>
                    <option value="false">Unavailable</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dietary *
                  </label>
                  <select
                    name="dietary"
                    defaultValue={food.dietary || "Non-Vegetarian"}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  >
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Flavor
                  </label>
                  <input
                    type="text"
                    name="flavor"
                    defaultValue={food.flavor || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Spice Level (0-5)
                  </label>
                  <input
                    type="number"
                    name="spiceLevel"
                    min="0"
                    max="5"
                    defaultValue={food.spiceLevel || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Nutrition Column */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 mb-2">Nutrition</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Calories
                  </label>
                  <input
                    type="number"
                    name="calories"
                    min="0"
                    defaultValue={food.calories || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Serving Size
                  </label>
                  <input
                    type="text"
                    name="servingSize"
                    defaultValue={food.servingSize || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Protein (g)
                  </label>
                  <input
                    type="number"
                    name="protein"
                    min="0"
                    defaultValue={food.protein || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Carbs (g)
                  </label>
                  <input
                    type="number"
                    name="carbs"
                    min="0"
                    defaultValue={food.carbs || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fats (g)
                  </label>
                  <input
                    type="number"
                    name="fats"
                    min="0"
                    defaultValue={food.fats || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information Column */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 mb-2">
                Additional Information
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ingredients (comma-separated)
                </label>
                <input
                  type="text"
                  name="ingredients"
                  defaultValue={food.ingredients?.join(", ") || ""}
                  placeholder="e.g., Dough, Cheese, Tomato"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  defaultValue={food.tags?.join(", ") || ""}
                  placeholder="e.g., Italian, Spicy"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  defaultValue={food.imageUrl || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  3D Model URL
                </label>
                <input
                  type="url"
                  name="model3DUrl"
                  defaultValue={food.model3DUrl || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 p-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Updating...
                </>
              ) : (
                "Update Food Item"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
