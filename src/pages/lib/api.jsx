// lib/api.js
let menuItems = [
  {
    id: "FOOD001",
    name: "Kottu Roti",
    description: "Chopped roti mixed with vegetables and spices",
    category: "Main",
    price: 750,
    rating: 4.5,
    origin: "Sri Lankan",
    preparationTime: 15,
    availability: true,
    dietary: "Non-Vegetarian",
    calories: 600,
    protein: 20,
    carbs: 80,
    fats: 15,
    flavor: "Savory",
    spiceLevel: 3,
    ingredients: ["Roti", "Chicken", "Vegetables", "Spices"],
    servingSize: "1 plate",
    tags: ["Spicy", "Popular"],
    imageUrl: "https://example.com/kottu-roti.jpg",
    model3DUrl: "https://example.com/kottu-roti-3d.glb",
  },
  {
    id: "FOOD002",
    name: "Fried Rice",
    description: "Stir-fried rice with vegetables and egg",
    category: "Main",
    price: 600,
    rating: 4.2,
    origin: "Chinese",
    preparationTime: 10,
    availability: true,
    dietary: "Vegetarian",
    calories: 500,
    protein: 15,
    carbs: 70,
    fats: 10,
    flavor: "Umami",
    spiceLevel: 1,
    ingredients: ["Rice", "Egg", "Vegetables", "Soy Sauce"],
    servingSize: "1 bowl",
    tags: ["Mild", "Quick"],
    imageUrl: "https://example.com/fried-rice.jpg",
    model3DUrl: "https://example.com/fried-rice-3d.glb",
  },
  {
    id: "FOOD003",
    name: "String Hoppers",
    description: "Steamed rice noodle patties with curry",
    category: "Breakfast",
    price: 400,
    rating: 4.0,
    origin: "Sri Lankan",
    preparationTime: 20,
    availability: false,
    dietary: "Vegetarian",
    calories: 300,
    protein: 8,
    carbs: 60,
    fats: 5,
    flavor: "Mild",
    spiceLevel: 2,
    ingredients: ["Rice Flour", "Coconut Milk", "Curry"],
    servingSize: "5 patties",
    tags: ["Traditional", "Gluten-Free"],
    imageUrl: "https://example.com/string-hoppers.jpg",
    model3DUrl: "https://example.com/string-hoppers-3d.glb",
  },
  {
    id: "FOOD004",
    name: "Curry",
    description: "Spicy vegetable curry",
    category: "Side",
    price: 200,
    rating: 3.8,
    origin: "Sri Lankan",
    preparationTime: 25,
    availability: true,
    dietary: "Vegan",
    calories: 150,
    protein: 5,
    carbs: 20,
    fats: 7,
    flavor: "Spicy",
    spiceLevel: 4,
    ingredients: ["Vegetables", "Coconut Milk", "Spices"],
    servingSize: "1 bowl",
    tags: ["Spicy", "Vegan"],
    imageUrl: "https://example.com/curry.jpg",
    model3DUrl: "https://example.com/curry-3d.glb",
  },
];

let settings = {
  restaurantName: "Smart Food Restaurant",
  currency: "LKR",
  taxRate: 0.1, // 10%
  contactEmail: "contact@smartfood.lk",
  phone: "+94 112 345 678",
  address: "123 Food Street, Colombo, Sri Lanka",
};

let orders = [
  {
    id: "ORD001",
    tableNumber: 5,
    items: [
      { foodId: "FOOD001", quantity: 2 },
      { foodId: "FOOD002", quantity: 1 },
    ],
    status: "Pending",
    createdAt: "2025-05-22T10:30:00Z",
  },
  {
    id: "ORD002",
    tableNumber: 12,
    items: [
      { foodId: "FOOD003", quantity: 3 },
      { foodId: "FOOD004", quantity: 1 },
    ],
    status: "Completed",
    createdAt: "2025-05-21T15:45:00Z",
  },
  {
    id: "ORD003",
    tableNumber: 8,
    items: [{ foodId: "FOOD001", quantity: 1 }],
    status: "Pending",
    createdAt: "2025-05-22T12:00:00Z",
  },
];

export const api2 = {
  getDashboardData() {
    return {
      menuItemsCount: menuItems.length,
      ordersSummary: { active: 15, completed: 30, total: 45 },
      popularItems: [
        { id: 1, name: "Kottu Roti", orders: 150, revenue: 112500 },
        { id: 2, name: "Fried Rice", orders: 120, revenue: 72000 },
        { id: 3, name: "String Hoppers", orders: 80, revenue: 32000 },
      ],
      dailySales: [25000, 30000, 28000, 32000, 35000, 40000, 38000],
      weeklySales: [150000, 180000, 170000, 200000],
    };
  },
  getOrders() {
    // Sort by createdAt, newest first
    return [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  getOrderDetails(id) {
    const order = orders.find((o) => o.id === id);
    if (!order) return null;
    let subtotal = 0;
    const itemDetails = order.items.map((item) => {
      const menuItem = menuItems.find((m) => m.id === item.foodId);
      const itemTotal = menuItem ? menuItem.price * item.quantity : 0;
      subtotal += itemTotal;
      return {
        foodId: item.foodId,
        name: menuItem ? menuItem.name : "Unknown",
        quantity: item.quantity,
        price: menuItem ? menuItem.price : 0,
        itemTotal,
      };
    });
    const tax = subtotal * settings.taxRate;
    const total = subtotal + tax;
    return {
      ...order,
      itemDetails,
      subtotal,
      tax,
      total,
    };
  },
  addOrder(order) {
    const newId = `ORD${String(orders.length + 1).padStart(3, "0")}`;
    if (orders.some((existingOrder) => existingOrder.id === newId)) {
      return null;
    }
    const newOrder = {
      id: newId,
      tableNumber: Number(order.tableNumber),
      items: order.items.map((item) => ({
        foodId: item.foodId,
        quantity: Number(item.quantity),
      })),
      status: order.status || "Pending",
      createdAt: new Date().toISOString(),
    };
    orders.push(newOrder);
    return newOrder;
  },
  updateOrder(id, updatedOrder) {
    const index = orders.findIndex((o) => o.id === id);
    if (index === -1) return null;
    const newOrder = {
      id,
      tableNumber: Number(updatedOrder.tableNumber),
      items: updatedOrder.items.map((item) => ({
        foodId: item.foodId,
        quantity: Number(item.quantity),
      })),
      status: updatedOrder.status,
      createdAt: orders[index].createdAt, // Preserve original creation time
    };
    orders[index] = newOrder;
    return newOrder;
  },
  deleteOrder(id) {
    const index = orders.findIndex((o) => o.id === id);
    if (index === -1) return false;
    orders.splice(index, 1);
    return true;
  },
  updateOrderStatus(id, status) {
    const index = orders.findIndex((o) => o.id === id);
    if (index === -1) return false;
    if (status === "Cancelled") {
      // Delete the order instead of setting status
      orders.splice(index, 1);
      return true;
    }
    orders[index].status = status;
    return true;
  },
  getMenuItems() {
    return menuItems;
  },
  addMenuItem(item) {
    const newId = `FOOD${String(menuItems.length + 1).padStart(3, "0")}`;
    if (menuItems.some((existingItem) => existingItem.id === newId)) {
      return null;
    }
    const newItem = {
      ...item,
      id: newId,
      rating: item.rating || 0,
      ingredients: item.ingredients ? item.ingredients.split(",").map((i) => i.trim()) : [],
      tags: item.tags ? item.tags.split(",").map((t) => t.trim()) : [],
      imageUrl: item.imageUrl || "https://example.com/default.jpg",
      model3DUrl: item.model3DUrl || "https://example.com/default-3d.glb",
    };
    menuItems.push(newItem);
    return newItem;
  },
  updateMenuItem(id, updatedItem) {
    const index = menuItems.findIndex((item) => item.id === id);
    if (index === -1) return null;
    const newItem = {
      ...updatedItem,
      id,
      rating: updatedItem.rating || 0,
      ingredients: updatedItem.ingredients ? updatedItem.ingredients.split(",").map((i) => i.trim()) : [],
      tags: updatedItem.tags ? updatedItem.tags.split(",").map((t) => t.trim()) : [],
      imageUrl: updatedItem.imageUrl || "https://example.com/default.jpg",
      model3DUrl: updatedItem.model3DUrl || "https://example.com/default-3d.glb",
    };
    menuItems[index] = newItem;
    return newItem;
  },
  deleteMenuItem(id) {
    const index = menuItems.findIndex((item) => item.id === id);
    if (index === -1) return false;
    menuItems.splice(index, 1);
    return true;
  },
  getSettings() {
    return settings;
  },
  updateSettings(newSettings) {
    settings = {
      ...settings,
      ...newSettings,
      taxRate: Number(newSettings.taxRate) || 0,
    };
    return settings;
  },
};










//Actual data fetching API implementation

// lib/api.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const api = {
  async getMenuItems() {
    const response = await fetch(`${API_URL}/api/foods`);
    if (!response.ok) throw new Error('Failed to fetch menu items');
    return response.json();
  },

  async getMenuItemById(id) {
    console.log('Calling getMenuItemById with ID:', id); 
    const response = await fetch(`${API_URL}/api/foods/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch food item with ID: ${id}`);
    return response.json();
  },

  async addMenuItem(newFood) {
    const response = await fetch(`${API_URL}/api/foods`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFood),
    });
    if (!response.ok) throw new Error('Failed to add menu item');
    return response.json();
  },

  async updateMenuItem(id, updatedFood) {
    const response = await fetch(`${API_URL}/api/foods/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFood),
    });
    if (!response.ok) throw new Error('Failed to update menu item');
    return response.json();
  },

  async deleteMenuItem(id) {
    const response = await fetch(`${API_URL}/api/foods/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete menu item');
    return response.ok;
  },
};










