// components/MenuItemsTable.js
import { useState, useCallback } from "react";
import { api } from "../lib/api";
import AddFoodModal from "./AddFoodModal";

export default function MenuItemsTable() {
  const [menuItems, setMenuItems] = useState(api.getMenuItems());
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    setMenuItems((prevItems) => {
      // Prevent duplicates by checking if the item already exists
      if (prevItems.some((item) => item.id === addedItem.id)) {
        return prevItems;
      }
      return [...prevItems, addedItem];
    });
  }, []);

  const handleView = (id) => {
    alert(`Viewing menu item ${id}`);
  };

  const handleEdit = (id) => {
    alert(`Editing menu item ${id}`);
  };

  return (
    <div className="table-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2>Menu Items</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#1e3a8a",
            color: "white",
            borderRadius: "0.375rem",
            border: "none",
            cursor: "pointer",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#1e40af")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#1e3a8a")}
        >
          Add New Food
        </button>
      </div>
      <AddFoodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddFood}
      />
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
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
        >
          <option value="All">All Availability</option>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>
        <select
          value={dietaryFilter}
          onChange={(e) => setDietaryFilter(e.target.value)}
        >
          {dietaryOptions.map((dietary) => (
            <option key={dietary} value={dietary}>
              {dietary}
            </option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price (LKR)</th>
            <th>Availability</th>
            <th>Rating</th>
            <th>Prep Time (min)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.price.toLocaleString()}</td>
              <td>
                <span className={`status-available-${item.availability}`}>
                  {item.availability ? "Available" : "Unavailable"}
                </span>
              </td>
              <td>{item.rating.toFixed(1)}</td>
              <td>{item.preparationTime}</td>
              <td>
                <button
                  className="action-btn"
                  onClick={() => handleView(item.id)}
                >
                  View
                </button>
                <button
                  className="action-btn"
                  onClick={() => handleEdit(item.id)}
                  style={{ marginLeft: "0.5rem" }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}