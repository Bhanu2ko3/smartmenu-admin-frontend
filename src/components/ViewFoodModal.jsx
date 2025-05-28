"use client";
import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { toast } from "react-toastify";
import { StarIcon } from "@heroicons/react/24/solid";
import { PhotoIcon } from "@heroicons/react/24/outline";

export default function ViewFoodModal({ isOpen, onClose, foodId, menuItems }) {
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen || !foodId) {
      console.log("ViewFoodModal: isOpen or foodId missing", {
        isOpen,
        foodId,
      });
      setLoading(false);
      return;
    }

    const fetchFood = async () => {
      try {
        setLoading(true);
        const data = await api.getMenuItemById(foodId);
        setFood({ ...data, _id: data._id });
      } catch (err) {
        console.error("Error fetching food item:", err);
        setError(err.message || "Failed to load food details");
        toast.error(`Error: ${err.message || "Failed to load food details"}`);
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, [isOpen, foodId, menuItems]);

  if (!isOpen) {
    console.log("ViewFoodModal: Not open");
    return null;
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
        <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-[400px]">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (!food) {
    return (
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
        <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-[400px]">
          <p className="text-gray-900 mb-4">No food item found</p>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-[1000] p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              {food.name}
              {food.rating > 0 && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-yellow-50 text-yellow-800">
                  <StarIcon className="h-4 w-4 mr-1 fill-yellow-500 text-yellow-500" />
                  {food.rating.toFixed(1)}
                </span>
              )}
            </h2>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-sm text-gray-500">{food.category}</span>
              <span className="text-sm font-medium text-gray-900">
                LKR{" "}
                {food.price?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200/50 transition-colors"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500 hover:text-gray-700"
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

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Left Column - Image and Basic Info */}
            <div className="space-y-6">
              {/* Image with fallback */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                {food.imageUrl ? (
                  <>
                    <img
                      src={food.imageUrl}
                      alt={food.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <PhotoIcon className="h-16 w-16 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Description
                  </h3>
                  <p className="text-gray-700">
                    {food.description || "No description available"}
                  </p>
                </div>

                {/* Quick Facts */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      Origin
                    </h3>
                    <p className="font-medium text-gray-900">
                      {food.origin || "Not specified"}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      Prep Time
                    </h3>
                    <p className="font-medium text-gray-900">
                      {food.preparationTime
                        ? `${food.preparationTime} mins`
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Detailed Info */}
            <div className="space-y-6">
              {/* Dietary & Availability */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Dietary
                  </h3>
                  {food.dietary === "Vegetarian" ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Vegetarian
                    </span>
                  ) : food.dietary === "Vegan" ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                      Vegan
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                      Non-Vegetarian
                    </span>
                  )}
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Availability
                  </h3>
                  {food.availability ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      Available
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                      Unavailable
                    </span>
                  )}
                </div>
              </div>

              {/* Flavor Profile */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                  Flavor Profile
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Spice Level</span>
                      <span className="font-medium">
                        {food.spiceLevel || 0}/5
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-red-400 to-red-600 h-2 rounded-full"
                        style={{ width: `${(food.spiceLevel / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                  {food.flavor && (
                    <div>
                      <h4 className="text-sm text-gray-600 mb-2">
                        Primary Flavors
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {food.flavor.split(",").map((flavor, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                          >
                            {flavor.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Nutrition Information */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                  Nutrition Information
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white p-3 rounded-lg shadow-xs text-center">
                    <p className="text-xs text-gray-500 mb-1">Calories</p>
                    <p className="font-semibold text-gray-900">
                      {food.calories || "N/A"}
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-xs text-center">
                    <p className="text-xs text-gray-500 mb-1">Protein</p>
                    <p className="font-semibold text-gray-900">
                      {food.protein ? `${food.protein}g` : "N/A"}
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-xs text-center">
                    <p className="text-xs text-gray-500 mb-1">Carbs</p>
                    <p className="font-semibold text-gray-900">
                      {food.carbs ? `${food.carbs}g` : "N/A"}
                    </p>
                  </div>
                  <div className="col-span-3 bg-white p-3 rounded-lg shadow-xs text-center">
                    <p className="text-xs text-gray-500 mb-1">Serving Size</p>
                    <p className="font-semibold text-gray-900">
                      {food.servingSize || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Ingredients */}
              {food.ingredients?.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Ingredients
                  </h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {food.ingredients.map((ingredient, i) => (
                      <li key={i} className="flex items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2" />
                        <span className="text-sm text-gray-700">
                          {ingredient.trim()}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              {food.tags?.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {food.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
