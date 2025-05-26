'use client';
import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { toast } from 'react-toastify';

export default function ViewFoodModal({ isOpen, onClose, foodId, menuItems }) {
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen || !foodId) {
      console.log('ViewFoodModal: isOpen or foodId missing', { isOpen, foodId });
      setLoading(false);
      return;
    }

    const fetchFood = async () => {
      try {
        setLoading(true);
        console.log('Fetching food for ID:', foodId);

        // Check cache first
        const cachedFood = menuItems.find((item) => item.id === foodId || item.id === Number(foodId));
        if (cachedFood) {
          console.log('Found in cache:', cachedFood);
          setFood(cachedFood);
          setLoading(false);
          return;
        }

        // Fetch from backend
        console.log('Fetching from backend...');
        const data = await api.getMenuItemById(foodId);
        console.log('Backend response:', data);
        setFood(data);
      } catch (err) {
        console.error('Error fetching food item:', err);
        setError(err.message || 'Failed to load food details');
        toast.error(`Error: ${err.message || 'Failed to load food details'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, [isOpen, foodId, menuItems]);

  if (!isOpen) {
    console.log('ViewFoodModal: Not open');
    return null;
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
        <p className="text-white">Loading...</p>
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
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-[600px] max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-4">View Food Item</h2>
        <div className="grid gap-2">
          <p className="text-sm text-gray-900"><strong className="font-semibold">ID:</strong> {food.id}</p>
          <p className="text-sm text-gray-900"><strong className="font-semibold">Name:</strong> {food.name}</p>
          <p className="text-sm text-gray-900"><strong className="font-semibold">Description:</strong> {food.description || 'N/A'}</p>
          <p className="text-sm text-gray-900"><strong className="font-semibold">Category:</strong> {food.category}</p>
          <p className="text-sm text-gray-900"><strong className="font-semibold">Price (LKR):</strong> {food.price.toLocaleString()}</p>
          <p className="text-sm text-gray-900"><strong className="font-semibold">Rating:</strong> {food.rating.toFixed(1)}</p>
          <p className="text-sm text-gray-900"><strong className="font-semibold">Origin:</strong> {food.origin || 'N/A'}</p>
          <p className="text-sm text-gray-900"><strong className="font-semibold">Preparation Time (min):</strong> {food.preparationTime || 'N/A'}</p>
          <p className="text-sm text-gray-900"><strong className="font-semibold">Availability:</strong> {food.availability ? 'Available' : 'Unavailable'}</p>
          <p className="text-sm text-gray-900"><strong className="font-semibold">Dietary:</strong> {food.dietary}</p>
          <p className="text-sm text-gray-900"><strong className="font-semibold">Calories:</strong> {food.calories || 'N/A'}</p>
          <p className="text-sm text-gray-900"><strong className="font-semibold">Protein (g):</strong> {food.protein || 'N/A'}</p>
          <p className="text-sm text-gray-900"><strong className="font-semibold">Carbs (g):</strong> {food.carbs || 'N/A'}</p>
          <p className="text-sm text-gray-900"><strong className="font-semibold">Fats (g):</strong> {food.fats || 'N/A'}</p>
          <p className="text-sm text-gray-900"><strong className="font-semibold">Flavor:</strong> {food.flavor || 'N/A'}</p>
          <p className="text-sm text-gray-900"><strong className="font-semibold">Spice Level:</strong> {food.spiceLevel || 'N/A'}</p>
          <p className="text-sm text-gray-900"><strong className="font-semibold">Ingredients:</strong> {food.ingredients?.join(', ') || 'N/A'}</p>
          <p className="text-sm text-gray-900"><strong className="font-semibold">Serving Size:</strong> {food.servingSize || 'N/A'}</p>
          <p className="text-sm text-gray-900"><strong className="font-semibold">Tags:</strong> {food.tags?.join(', ') || 'N/A'}</p>
          <p className="text-sm text-gray-900"><strong className="font-semibold">Image URL:</strong> {food.imageUrl || 'N/A'}</p>
          <p className="text-sm text-gray-900"><strong className="font-semibold">3D Model URL:</strong> {food.model3DUrl || 'N/A'}</p>
        </div>
        <div className="flex gap-4 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}