// components/OrdersTable.js
import { useState, useEffect } from "react";
import { api } from "../lib/api";
import ViewOrderModal from "./ViewOrderModal";
import AddOrderModal from "./AddOrderModal";
import EditOrderModal from "./EditOrderModal";
import DeleteOrderConfirm from "./DeleteOrderConfirm";

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Pending");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deleteOrderId, setDeleteOrderId] = useState(null);
  const [message, setMessage] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = api.getOrders();
        const menuItemsData = api.getMenuItems();
        setOrders(ordersData);
        setMenuItems(menuItemsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage({ type: "error", text: "Failed to load orders" });
        setTimeout(() => setMessage(null), 3000);
      }
    };
    fetchData();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = searchTerm === "" || String(order.tableNumber).includes(searchTerm);
    const matchesTab = activeTab === "All" || order.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleViewDetails = (id) => {
    try {
      const orderDetails = api.getOrderDetails(id);
      if (!orderDetails) {
        setMessage({ type: "error", text: `Order ${id} not found` });
        setTimeout(() => setMessage(null), 3000);
        return;
      }
      setSelectedOrder(orderDetails);
      setIsViewModalOpen(true);
    } catch (error) {
      console.error("Error fetching order details:", error);
      setMessage({ type: "error", text: "Failed to load order details" });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleAddOrder = (newOrder) => {
    setOrders((prev) => [...prev, newOrder].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    setMessage({ type: "success", text: `Order ${newOrder.id} added` });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleUpdateOrder = (updatedOrder) => {
    if (updatedOrder.status === "Cancelled") {
      setOrders((prev) => prev.filter((o) => o.id !== updatedOrder.id));
      setMessage({ type: "success", text: `Order ${updatedOrder.id} deleted` });
    } else {
      setOrders((prev) =>
        prev
          .map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
      setMessage({ type: "success", text: `Order ${updatedOrder.id} updated` });
    }
    setTimeout(() => setMessage(null), 3000);
  };

  const handleDeleteOrder = (id) => {
    try {
      const success = api.deleteOrder(id);
      if (success) {
        setOrders((prev) => prev.filter((o) => o.id !== id));
        setMessage({ type: "success", text: `Order ${id} deleted` });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: "error", text: "Failed to delete order" });
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      setMessage({ type: "error", text: "Failed to delete order" });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const tabs = ["All", "Pending", "Preparing", "Completed"];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Table Number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full max-w-[200px] focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
        />
      </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800"
        >
          Add Order
        </button>
      </div>
      {message && (
        <div
          className={`mb-4 p-4 rounded-md ${
            message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}
      
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md ${
              activeTab === tab
                ? "bg-blue-900 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse" aria-label="Orders table">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left font-semibold text-gray-700">Order ID</th>
              <th className="p-3 text-left font-semibold text-gray-700">Table</th>
              <th className="p-3 text-left font-semibold text-gray-700">Items</th>
              <th className="p-3 text-left font-semibold text-gray-700">Total (LKR)</th>
              <th className="p-3 text-left font-semibold text-gray-700">Status</th>
              <th className="p-3 text-left font-semibold text-gray-700">Created At</th>
              <th className="p-3 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => {
              const orderDetails = api.getOrderDetails(order.id);
              const itemsSummary = order.items
                .map((item) => {
                  const menuItem = menuItems.find((m) => m.id === item.foodId);
                  return `${item.quantity}x ${menuItem ? menuItem.name : "Unknown"}`;
                })
                .join(", ");
              return (
                <tr key={order.id} className="border-b border-gray-200">
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">{order.tableNumber}</td>
                  <td className="p-3">{itemsSummary}</td>
                  <td className="p-3">
                    {orderDetails ? orderDetails.total.toLocaleString() : "N/A"}
                  </td>
                  <td className="p-3">
                    <span
                      className={`inline-block px-2 py-1 rounded ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>  
                  <td className="p-3">{new Date(order.createdAt).toLocaleString()}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleViewDetails(order.id)}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <AddOrderModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddOrder}
      />
      <ViewOrderModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        order={selectedOrder}
        onEdit={(order) => {
          setSelectedOrder(order);
          setIsViewModalOpen(false);
          setIsEditModalOpen(true);
        }}
      />
      <EditOrderModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        order={selectedOrder}
        onUpdate={handleUpdateOrder}
      />
      <DeleteOrderConfirm
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteOrder}
        orderId={deleteOrderId}
      />
    </div>
  );
}