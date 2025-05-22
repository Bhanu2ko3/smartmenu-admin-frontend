// components/AddFoodModal.js
import { useState } from "react";

export default function AddFoodModal({ isOpen, onClose, onAdd }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const newFood = {
      name: formData.get("name"),
      description: formData.get("description"),
      category: formData.get("category"),
      price: Number(formData.get("price")),
      rating: Number(formData.get("rating")) || 0,
      origin: formData.get("origin"),
      preparationTime: Number(formData.get("preparationTime")),
      availability: formData.get("availability") === "true",
      dietary: formData.get("dietary"),
      calories: Number(formData.get("calories")),
      protein: Number(formData.get("protein")),
      carbs: Number(formData.get("carbs")),
      fats: Number(formData.get("fats")),
      flavor: formData.get("flavor"),
      spiceLevel: Number(formData.get("spiceLevel")),
      ingredients: formData.get("ingredients"),
      servingSize: formData.get("servingSize"),
      tags: formData.get("tags"),
      imageUrl: formData.get("imageUrl"),
      model3DUrl: formData.get("model3DUrl"),
    };

    try {
      await onAdd(newFood); // Ensure onAdd is awaited
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Food Item</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" name="name" required />
          </label>
          <label>
            Description
            <textarea name="description" rows="3" />
          </label>
          <label>
            Category
            <select name="category" required>
              <option value="Main">Main</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Side">Side</option>
              <option value="Dessert">Dessert</option>
            </select>
          </label>
          <label>
            Price (LKR)
            <input type="number" name="price" min="0" step="1" required />
          </label>
          <label>
            Rating (0-5)
            <input type="number" name="rating" min="0" max="5" step="0.1" />
          </label>
          <label>
            Origin
            <input type="text" name="origin" />
          </label>
          <label>
            Preparation Time (min)
            <input type="number" name="preparationTime" min="0" />
          </label>
          <label>
            Availability
            <select name="availability" required>
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>
          </label>
          <label>
            Dietary
            <select name="dietary" required>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
            </select>
          </label>
          <label>
            Calories
            <input type="number" name="calories" min="0" />
          </label>
          <label>
            Protein (g)
            <input type="number" name="protein" min="0" />
          </label>
          <label>
            Carbs (g)
            <input type="number" name="carbs" min="0" />
          </label>
          <label>
            Fats (g)
            <input type="number" name="fats" min="0" />
          </label>
          <label>
            Flavor
            <input type="text" name="flavor" />
          </label>
          <label>
            Spice Level (0-5)
            <input type="number" name="spiceLevel" min="0" max="5" />
          </label>
          <label>
            Ingredients (comma-separated)
            <input type="text" name="ingredients" />
          </label>
          <label>
            Serving Size
            <input type="text" name="servingSize" />
          </label>
          <label>
            Tags (comma-separated)
            <input type="text" name="tags" />
          </label>
          <label>
            Image URL
            <input type="url" name="imageUrl" />
          </label>
          <label>
            3D Model URL
            <input type="url" name="model3DUrl" />
          </label>
          <div className="button-group">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Food"}
            </button>
            <button type="button" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}