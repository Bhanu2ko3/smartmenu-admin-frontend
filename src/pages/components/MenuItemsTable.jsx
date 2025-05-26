"use client";
import { useState, useEffect, useCallback } from "react";
import { api } from "../../lib/api";
import AddFoodModal from "./AddFoodModal";
import ViewFoodModal from "./ViewFoodModal";
import EditFoodModal from "./EditFoodModal";
import DeleteFoodConfirm from "./DeleteFoodConfirm";
import { toast, ToastContainer } from "react-toastify";

export default function MenuItemsTable() {
  const [menuItems, setMenuItems] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedFoodId, setSelectedFoodId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [dietaryFilter, setDietaryFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMenuItems = async () => {
    const response = await api.getMenuItems();
    setMenuItems(response);
  };

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const items = await api.getMenuItems();
        setMenuItems(items);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching menu items:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, []);

  const categories = [
    "All",
    ...new Set(menuItems.map((item) => item.category)),
  ];
  const dietaryOptions = [
    "All",
    ...new Set(menuItems.map((item) => item.dietary)),
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      searchTerm === "" ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || item.category === categoryFilter;
    const matchesAvailability =
      availabilityFilter === "All" ||
      (availabilityFilter === "Available"
        ? item.availability
        : !item.availability);
    const matchesDietary =
      dietaryFilter === "All" || item.dietary === dietaryFilter;
    return (
      matchesSearch && matchesCategory && matchesAvailability && matchesDietary
    );
  });

  const handleAddFood = useCallback(async (newFood) => {
    try {
      const addedItem = await api.addMenuItem(newFood);
      setMenuItems((prevItems) => {
        if (prevItems.some((item) => item.id === addedItem.id)) {
          return prevItems;
        }
        return [...prevItems, addedItem];
      });
      setIsAddModalOpen(false);
      await fetchMenuItems();
      setSelectedFoodId(null);
    } catch (err) {
      console.error("Error adding food:", err);
      alert("Failed to add food");
    }
  }, []);

  const handleView = (id) => {
    setSelectedFoodId(id);
    setIsViewModalOpen(true);
  };

  const handleEdit = (id) => {
    const food = menuItems.find((item) => item._id === id);
    setSelectedFoodId(food);
    setIsEditModalOpen(true);
  };


  const handleUpdateFood = async (id, updatedFood) => {
    try {
      const updatedItem = await api.updateMenuItem(id, updatedFood);
      setMenuItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? updatedItem : item
        )
      );
      setIsEditModalOpen(false);
      await fetchMenuItems();
      setSelectedFoodId(null);

    } catch (err) {
      console.error("Error updating food:", err);
      alert("Failed to update food");
    }
  };

  const handleDelete = (id) => {
    const food = menuItems.find((item) => item._id === id);
    setSelectedFoodId(food);
    setIsDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedFoodId) {
      try {
        await api.deleteMenuItem(selectedFoodId._id);
        setMenuItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedFoodId._id)
        );
        setIsDeleteConfirmOpen(false);
        await fetchMenuItems();
        setSelectedFoodId(null);
      } catch (err) {
        console.error("Error deleting food:", err);
        alert("Failed to delete food");
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full max-w-[200px] focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
        />
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
        foodId={selectedFoodId}
        menuItems={menuItems} // Pass menuItems for caching
      />
      <EditFoodModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdateFood}
        food={selectedFoodId} // Pass food object
      />
      <DeleteFoodConfirm
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        foodName={selectedFoodId?.name}
      />
      <div className="flex flex-wrap gap-4 mb-4">
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
            {/* <th className="bg-gray-100 text-gray-900 font-semibold p-3 text-left">ID</th> */}
            <th className="bg-gray-100 text-gray-900 font-semibold p-3 text-left">
              Name
            </th>
            <th className="bg-gray-100 text-gray-900 font-semibold p-3 text-left">
              Category
            </th>
            <th className="bg-gray-100 text-gray-900 font-semibold p-3 text-left">
              Price (LKR)
            </th>
            <th className="bg-gray-100 text-gray-900 font-semibold p-3 text-left">
              Availability
            </th>
            <th className="bg-gray-100 text-gray-900 font-semibold p-3 text-left">
              Rating
            </th>
            <th className="bg-gray-100 text-gray-900 font-semibold p-3 text-left">
              Prep Time (min)
            </th>
            <th className="bg-gray-100 text-gray-900 font-semibold p-3 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.id} className="border-b border-gray-200">
              {/* <td className="p-3 text-gray-750">{item.id}</td> */}
              <td className="p-3 text-gray-750">{item.name}</td>
              <td className="p-3 text-gray-750">{item.category}</td>
              <td className="p-3 text-gray-750">{item.price}</td>
              <td className="p-3">
                <span
                  className={`inline-block px-2 py-1 rounded ${item.availability
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                    }`}
                >
                  {item.availability ? "Available" : "Unavailable"}
                </span>
              </td>
              <td className="p-3 text-gray-750">{item.rating}</td>
              <td className="p-3 text-gray-750">{item.preparationTime}</td>
              <td className="p-3 flex gap-2">
                <button
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                  onClick={() => handleView(item._id)}
                >
                  View
                </button>
                <button
                  className="bg-green-200 text-green-700 px-4 py-2 rounded-md hover:bg-green-400"
                  onClick={() => handleEdit(item._id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-300 text-red-700 px-2 py-1 rounded-md hover:bg-red-400"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer position="top-right" autoClose={7000} />
    </div>
  );
}
