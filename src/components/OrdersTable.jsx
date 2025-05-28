"use client";
import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { toast, ToastContainer } from "react-toastify";
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
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [ordersData, menuItemsData] = await Promise.all([
          api.getOrders(),
          api.getMenuItems(),
        ]);
        console.log("Fetched orders:", ordersData);
        console.log("Fetched menuItems:", menuItemsData);
        // Sanitize orders to ensure items is an array
        const sanitizedOrders = ordersData.map((order) => ({
          ...order,
          items: Array.isArray(order.items) ? order.items : [],
        }));
        setOrders(sanitizedOrders);
        setMenuItems(menuItemsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load orders or menu items");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      searchTerm === "" || String(order.tableNumber).includes(searchTerm);
    const matchesTab = activeTab === "All" || order.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const calculateOrderTotal = (order) => {
    return (order.items || []).reduce((total, item) => {
      const menuItem = menuItems.find((m) => m._id === item.foodId);
      return total + (menuItem ? menuItem.price * item.quantity : 0);
    }, 0);
  };

  const handleViewDetails = async (_id) => {
    if (loading) {
      toast.error("Please wait, data is still loading");
      return;
    }
    try {
      console.log("Fetching order details for _id:", _id);
      const orderDetails = await api.getOrderById(_id);
      if (!orderDetails) {
        toast.error(`Order ${_id} not found`);
        return;
      }
      // Ensure items is an array
      orderDetails.items = Array.isArray(orderDetails.items)
        ? orderDetails.items
        : [];
      setSelectedOrder(orderDetails);
      setIsViewModalOpen(true);
    } catch (error) {
      console.error("Error fetching order details:", error);
      toast.error("Failed to load order details");
    }
  };

  const handleAddOrder = (newOrder) => {
    setOrders((prev) => [
      ...prev,
      { ...newOrder, createdAt: new Date().toISOString() },
    ]);
  };

  const handleUpdateOrder = (updatedOrder) => {
    if (updatedOrder.status === "Cancelled") {
      setOrders((prev) => prev.filter((o) => o._id !== updatedOrder._id));
      toast.success(`Order ${updatedOrder._id} cancelled`);
    } else {
      setOrders((prev) =>
        prev
          .map((o) =>
            o._id === updatedOrder._id
              ? {
                  ...updatedOrder,
                  items: Array.isArray(updatedOrder.items)
                    ? updatedOrder.items
                    : [],
                }
              : o
          )
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    }
  };

  const handleDeleteOrder = async (_id) => {
    try {
      console.log("Deleting order with _id:", _id);
      await api.deleteOrder(_id);
      setOrders((prev) => prev.filter((o) => o._id !== _id));
      toast.success(`Order ${_id} deleted`);
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Failed to delete order");
    }
  };

  const tabs = ["All", "Pending", "Preparing", "Completed"];

  if (loading) {
    return (
      <div className="p-4 space-y-4">
        {[...Array(3)].map((_, idx) => (
          <div key={idx} className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-300 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="">
  {/* Header with search and add button */}
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
    <h2 className="text-2xl font-semibold text-gray-800">Orders Management</h2>
    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
      <div className="relative w-full sm:w-64">
        <input
          type="text"
          placeholder="Search by Table Number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
        <svg
          className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add Order
      </button>
    </div>
  </div>

  {/* Status tabs */}
  <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
    {tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
          activeTab === tab
            ? "bg-blue-600 text-white shadow-sm"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>

  {/* Orders table */}
  <div className="overflow-x-auto rounded-lg border border-gray-200">
    <table className="min-w-full divide-y divide-gray-200" aria-label="Orders table">
      <thead className="bg-gray-50">
        <tr>
          {[
            "Order ID",
            "Table",
            "Items",
            "Total (LKR)",
            "Status",
            "Created At",
            "Actions"
          ].map((header) => (
            <th
              key={header}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {filteredOrders.map((order) => {
          const itemsSummary =
            (order.items || [])
              .map((item) => {
                const menuItem = menuItems.find((m) => m._id === item.foodId);
                return `${item.quantity}x ${menuItem ? menuItem.name : "Unknown"}`;
              })
              .join(", ") || "No items";
          return (
            <tr key={order._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {order._id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.tableNumber}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                {itemsSummary}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {calculateOrderTotal(order).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : order.status === "Cancelled"
                      ? "bg-red-100 text-red-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => handleViewDetails(order._id)}
                  className="text-blue-600 hover:text-blue-900 mr-3 inline-flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>

  {/* Empty state */}
  {filteredOrders.length === 0 && (
    <div className="text-center py-12">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
      <p className="mt-1 text-sm text-gray-500">
        {searchTerm ? "Try a different search term" : "Get started by adding a new order"}
      </p>
      <div className="mt-6">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          New Order
        </button>
      </div>
    </div>
  )}

  {/* Modals */}
  <AddOrderModal
    isOpen={isAddModalOpen}
    onClose={() => setIsAddModalOpen(false)}
    onAdd={handleAddOrder}
  />
  <ViewOrderModal
    isOpen={isViewModalOpen}
    onClose={() => setIsViewModalOpen(false)}
    order={selectedOrder}
    onEdit={() => {
      setIsViewModalOpen(false);
      setIsEditModalOpen(true);
    }}
    menuItems={menuItems}
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
  
  <ToastContainer 
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
  />
</div>
  );
}
