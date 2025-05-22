// components/OrdersTable.js
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
    <div className="table-container">
      <h2>Orders</h2>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search by table number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Table Number</th>
            <th>Items</th>
            <th>Total (LKR)</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.tableNumber}</td>
              <td>
                {order.items.map((item, index) => (
                  <span key={index}>
                    {menuItems[item.foodId]?.name || item.foodId} (x{item.quantity})
                    {index < order.items.length - 1 ? ", " : ""}
                  </span>
                ))}
              </td>
              <td>{calculateTotal(order.items).toLocaleString()}</td>
              <td>
                <span className={`status-${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td>
                <button
                  className="action-btn"
                  onClick={() => handleView(order.id)}
                >
                  View
                </button>
                <button
                  className="action-btn"
                  onClick={() => handleUpdateStatus(order.id, order.status)}
                  style={{ marginLeft: "0.5rem" }}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}