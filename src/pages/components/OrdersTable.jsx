import { useState } from "react";
import { api } from "../lib/api";

export default function OrdersTable() {
  const orders = api.getOrders();
  const menuItems = api.getMenuItems();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = searchTerm === "" || order.tableNumber.toString().includes(searchTerm);
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const calculateTotal = (items) => {
    return items.reduce((total, item) => {
      const itemPrice = menuItems[item.foodId]?.price || 0;
      return total + itemPrice * item.quantity;
    }, 0);
  };

  const handleView = (id) => {
    alert(`Viewing order ${id}`); // Placeholder for view action
  };

  const handleUpdateStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "Pending" ? "Completed" : "Pending";
    alert(`Updating order ${id} to ${newStatus}`); // Placeholder for status update
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Orders</h2>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by table number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full max-w-xs focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left text-sm font-semibold text-gray-900">ID</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-900">Table Number</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-900">Items</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-900">Total (LKR)</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-900">Created At</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b border-gray-200">
                <td className="p-3 text-sm text-gray-900">{order.id}</td>
                <td className="p-3 text-sm text-gray-900">{order.tableNumber}</td>
                <td className="p-

3 text-sm text-gray-900">
                  {order.items.map((item, index) => (
                    <span key={index}>
                      {menuItems[item.foodId]?.name || item.foodId} (x{item.quantity})
                      {index < order.items.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </td>
                <td className="p-3 text-sm text-gray-900">{calculateTotal(order.items).toLocaleString()}</td>
                <td className="p-3 text-sm">
                  <span
                    className={`${
                      order.status.toLowerCase() === "pending"
                        ? "text-amber-600"
                        : "text-green-600"
                    } font-semibold`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-900">{new Date(order.createdAt).toLocaleString()}</td>
                <td className="p-3 text-sm">
                  <button
                    className="px-3 py-1 bg-indigo-900 text-white rounded-md hover:bg-indigo-800"
                    onClick={() => handleView(order.id)}
                  >
                    View
                  </button>
                  <button
                    className="px-3 py-1 bg-indigo-900 text-white rounded-md hover:bg-indigo-800 ml-2"
                    onClick={() => handleUpdateStatus(order.id, order.status)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}