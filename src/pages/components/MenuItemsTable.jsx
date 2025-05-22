// components/MenuItemsTable.js
import { useState, useCallback } from "react";
import { api } from "../lib/api";
import AddFoodModal from "./AddFoodModal";
import ViewFoodModal from "./ViewFoodModal";
import EditFoodModal from "./EditFoodModal";
import DeleteFoodConfirm from "./DeleteFoodConfirm";

export default function MenuItemsTable() {
  const [menuItems, setMenuItems] = useState(api.getMenuItems());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [dietaryFilter, setDietaryFilter] = useState("All");

  const categories = ["All", ...new Set(menuItems.map((item) => item.category))];
  const dietaryOptions = ["All", ...new Set(menuItems.map((item) => item.dietary))];

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = searchTerm === "" || item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
    const matchesAvailability = availabilityFilter === "All" || 
      (availabilityFilter === "Available" ? item.availability : !item.availability);
    const matchesDietary = dietaryFilter === "All" || item.dietary === dietaryFilter;
    return matchesSearch && matchesCategory && matchesAvailability && matchesDietary;
  });

  const handleAddFood = useCallback(async (newFood) => {
    const addedItem = api.addMenuItem(newFood);
    if (addedItem) {
      setMenuItems((prevItems) => {
        if (prevItems.some((item) => item.id === addedItem.id)) {
          return prevItems;
        }
        return [...prevItems, addedItem];
      });
    }
  }, []);

  const handleView = (id) => {
    const food = menuItems.find((item) => item.id === id);
    setSelectedFood(food);
    setIsViewModalOpen(true);
  };

  const handleEdit = (id) => {
    const food = menuItems.find((item) => item.id === id);
    setSelectedFood(food);
    setIsEditModalOpen(true);
  };

  const handleUpdateFood = async (id, updatedFood) => {
    const updatedItem = api.updateMenuItem(id, updatedFood);
    if (updatedItem) {
      setMenuItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? updatedItem : item))
      );
    }
  };

  const handleDelete = (id) => {
    const food = menuItems.find((item) => item.id === id);
    setSelectedFood(food);
    setIsDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedFood) {
      const success = api.deleteMenuItem(selectedFood.id);
      if (success) {
        setMenuItems((prevItems) => prevItems.filter((item) => item.id !== selectedFood.id));
      }
      setIsDeleteConfirmOpen(false);
      setSelectedFood(null);
    }
  };

  return (
  <div className="bg-white rounded-xl shadow-md p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold text-gray-900">Menu Items</h2>
      <button
        className="bg-indigo-900 text-white px-4 py-2 rounded-md hover:bg-indigo-800 transition-colors"
        onClick={() => setIsAddModalOpen(true)}
      >
        Add New Food
      </button>
    </div>
    <AddFoodModal
      isOpen={isAddModalOpen}
      onClose={() => setIsAddModalOpen(false)}
      onAdd={handleAddFood}
    />
    <ViewFoodModal
      isOpen={isViewModalOpen}
      onClose={() => setIsViewModalOpen(false)}
      food={selectedFood}
    />
    <EditFoodModal
      isOpen={isEditModalOpen}
      onClose={() => setIsEditModalOpen(false)}
      onUpdate={handleUpdateFood}
      food={selectedFood}
    />
    <DeleteFoodConfirm
      isOpen={isDeleteConfirmOpen}
      onClose={() => setIsDeleteConfirmOpen(false)}
      onConfirm={handleConfirmDelete}
      foodName={selectedFood?.name}
    />
    <div className="flex flex-wrap gap-4 mb-4">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border border-gray-300 rounded-md w-full max-w-[200px] focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
      />
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="p-2 border border-gray-300 rounded-md w-full max-w-[200px] focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <select
        value={availabilityFilter}
        onChange={(e) => setAvailabilityFilter(e.target.value)}
        className="p-2 border border-gray-300 rounded-md w-full max-w-[200px] focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
      >
        <option value="All">All Availability</option>
        <option value="Available">Available</option>
        <option value="Unavailable">Unavailable</option>
      </select>
      <select
        value={dietaryFilter}
        onChange={(e) => setDietaryFilter(e.target.value)}
        className="p-2 border border-gray-300 rounded-md w-full max-w-[200px] focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
      >
        {dietaryOptions.map((dietary) => (
          <option key={dietary} value={dietary}>
            {dietary}
          </option>
        ))}
      </select>
    </div>
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="bg-gray-100 text-gray-900 font-semibold p-3 text-left">ID</th>
          <th className="bg-gray-100 text-gray-900 font-semibold p-3 text-left">Name</th>
          <th className="bg-gray-100 text-gray-900 font-semibold p-3 text-left">Category</th>
          <th className="bg-gray-100 text-gray-900 font-semibold p-3 text-left">Price (LKR)</th>
          <th className="bg-gray-100 text-gray-900 font-semibold p-3 text-left">Availability</th>
          <th className="bg-gray-100 text-gray-900 font-semibold p-3 text-left">Rating</th>
          <th className="bg-gray-100 text-gray-900 font-semibold p-3 text-left">Prep Time (min)</th>
          <th className="bg-gray-100 text-gray-900 font-semibold p-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredItems.map((item) => (
          <tr key={item.id} className="border-b border-gray-200">
            <td className="p-3 text-gray-900">{item.id}</td>
            <td className="p-3 text-gray-900">{item.name}</td>
            <td className="p-3 text-gray-900">{item.category}</td>
            <td className="p-3 text-gray-900">{item.price.toLocaleString()}</td>
            <td className="p-3">
              <span
                className={`inline-block px-2 py-1 rounded ${
                  item.availability
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {item.availability ? "Available" : "Unavailable"}
              </span>
            </td>
            <td className="p-3 text-gray-900">{item.rating.toFixed(1)}</td>
            <td className="p-3 text-gray-900">{item.preparationTime}</td>
            <td className="p-3 flex gap-2">
              <button
                className="text-indigo-900 underline hover:text-indigo-800"
                onClick={() => handleView(item.id)}
              >
                View
              </button>
              <button
                className="text-indigo-900 underline hover:text-indigo-800"
                onClick={() => handleEdit(item.id)}
              >
                Edit
              </button>
              <button
                className="text-red-600 underline hover:text-red-800"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}