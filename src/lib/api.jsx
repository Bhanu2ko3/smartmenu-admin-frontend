const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://smartmenu-backend.up.railway.app";

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


// Dummy fallback data
const fallbackAnalyticsData = {
  metrics: {
    totalOrders: 1234,
    totalRevenue: 789000,
    avgOrderValue: 639.48,
    activeTables: 3,
  },
  dailyOrders: [
    { date: "2025-05-22", count: 10, revenue: 7500 },
    { date: "2025-05-23", count: 15, revenue: 9000 },
    { date: "2025-05-24", count: 12, revenue: 8400 },
    { date: "2025-05-25", count: 18, revenue: 10800 },
    { date: "2025-05-26", count: 20, revenue: 12000 },
    { date: "2025-05-27", count: 22, revenue: 13200 },
    { date: "2025-05-28", count: 25, revenue: 15000 },
  ],
  tableOccupancy: [
    { tableNumber: 5, orders: 8, lastUsed: "2025-05-28T10:30:00Z" },
    { tableNumber: 12, orders: 5, lastUsed: "2025-05-27T15:45:00Z" },
    { tableNumber: 8, orders: 3, lastUsed: "2025-05-28T12:00:00Z" },
  ],
  popularItems: [
    { id: "1", name: "Chicken Biryani", orders: 75, revenue: 56250 },
    { id: "2", name: "Margherita Pizza", orders: 60, revenue: 48000 },
    { id: "3", name: "Fish Curry", orders: 45, revenue: 33750 },
  ],
};

const fallbackDashboardData = {
  menuItemsCount: 50,
  ordersSummary: {
    total: 150,
    pending: 20,
    preparing: 30,
    completed: 100,
  },
  mostSoldItems: [
    { foodId: "1", name: "Chicken Biryani", quantitySold: 75 },
    { foodId: "2", name: "Margherita Pizza", quantitySold: 60 },
    { foodId: "3", name: "Fish Curry", quantitySold: 45 },
    { foodId: "4", name: "Fried Rice", quantitySold: 30 },
    { foodId: "5", name: "Chocolate Cake", quantitySold: 25 },
  ],
  totalSales: 1250000,
};

export const api = {

  // Dashboard API
  async getDashboardData() {
    try {
      // return dummy data directly
      console.log("Using fallback dashboard data");
      return fallbackDashboardData;
    } catch (error) {
      console.error("Error getting dashboard data:", error);
      return fallbackDashboardData;
    }
  },

  async getAnalyticsData() {
    try {
      // return dummy data directly
      console.log("Using fallback analytics data");
      return fallbackAnalyticsData;
    } catch (error) {
      console.error("Error getting analytics data:", error);
      return fallbackAnalyticsData;
    }
  },

  //orders api

  // get all orders
  async getOrders() {
    const response = await fetch(`${API_URL}/api/orders`);
    if (!response.ok)
      throw new Error(
        `Failed to fetch orders: ${response.status} ${response.statusText}`
      );
    const data = await response.json();
    return data.map((order) => ({ ...order, _id: order._id }));
  },

  // get order by id
  async getOrderById(_id) {
    console.log("Fetching order with _id:", _id);
    const response = await fetch(`${API_URL}/api/orders/${_id}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch order with _id ${_id}: ${response.status} ${response.statusText} - ${errorText}`
      );
    }
    const data = await response.json();
    return { ...data, _id: data._id };
  },

  // add (create) a new order
  async addOrder(order) {
    console.log("Adding order:", order);
    const response = await fetch(`${API_URL}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to add order: ${response.status} ${response.statusText} - ${errorText}`
      );
    }
    const data = await response.json();
    return { ...data, _id: data._id };
  },

  // update an existing order
  async updateOrder(id, updatedOrder) {
    console.log("Updating order with ID:", id, "Data:", updatedOrder); // Debug log
    try {
      const response = await fetch(`${API_URL}/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedOrder),
      });
      if (!response.ok) {
        const errorText = await response.text(); // Get detailed error message
        throw new Error(
          `Failed to update order: ${response.status} ${response.statusText} - ${errorText}`
        );
      }
      return response.json();
    } catch (err) {
      console.error("Update error:", err);
      throw err;
    }
  },

  // delete an order
  async deleteOrder(_id) {
    console.log("Deleting order with _id:", _id);
    const response = await fetch(`${API_URL}/api/orders/${_id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to delete order: ${response.status} ${response.statusText} - ${errorText}`
      );
    }
    return true;
  },

  // Menu Api

  // get all menu items
  async getMenuItems() {
    const response = await fetch(`${API_URL}/api/foods`);
    if (!response.ok)
      throw new Error(
        `Failed to fetch menu items: ${response.status} ${response.statusText}`
      );
    return response.json();
  },

  // get menu item by id
  async getMenuItemById(id) {
    console.log("Calling getMenuItemById with ID:", id);
    const response = await fetch(`${API_URL}/api/foods/${id}`);
    if (!response.ok)
      throw new Error(
        `Failed to fetch food item with ID ${id}: ${response.status} ${response.statusText}`
      );
    return response.json();
  },

  // add a new menu item
  async addMenuItem(newFood) {
    const response = await fetch(`${API_URL}/api/foods`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFood),
    });
    if (!response.ok)
      throw new Error(
        `Failed to add menu item: ${response.status} ${response.statusText}`
      );
    return response.json();
  },

  // update an existing menu item
  async updateMenuItem(id, updatedFood) {
    console.log("Updating food item with ID:", id, "Data:", updatedFood); // Debug log
    try {
      const response = await fetch(`${API_URL}/api/foods/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFood),
      });
      if (!response.ok) {
        const errorText = await response.text(); // Get detailed error message
        throw new Error(
          `Failed to update menu item: ${response.status} ${response.statusText} - ${errorText}`
        );
      }
      return response.json();
    } catch (err) {
      console.error("Update error:", err);
      throw err;
    }
  },

  // delete a menu item
  async deleteMenuItem(id) {
    const response = await fetch(`${API_URL}/api/foods/${id}`, {
      method: "DELETE",
    });
    if (!response.ok)
      throw new Error(
        `Failed to delete menu item: ${response.status} ${response.statusText}`
      );
    return response.ok;
  },

  // Settings API
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
