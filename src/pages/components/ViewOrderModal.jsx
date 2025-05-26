'use client';
import { useMemo } from 'react';

export default function ViewOrderModal({ isOpen, onClose, order, onEdit, menuItems = [] }) {
  if (!isOpen || !order) return null;

  // Calculate order details
  const orderDetails = useMemo(() => {
    const items = order.items.map(item => {
      const menuItem = menuItems && Array.isArray(menuItems) ? menuItems.find(m => m._id === item.foodId) : null;
      return {
        quantity: item.quantity,
        name: menuItem ? menuItem.name : 'Unknown Item',
        price: menuItem ? menuItem.price : 0,
        itemTotal: menuItem ? menuItem.price * item.quantity : 0,
      };
    });

    const subtotal = items.reduce((sum, item) => sum + item.itemTotal, 0);
    const taxRate = 0.10; // 10% tax rate
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    return { items, subtotal, tax, total };
  }, [order.items, menuItems]);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      aria-label="View order modal"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Order Details - {order._id}</h2>
        <div className="grid gap-2 text-sm text-gray-700">
          <p><strong>Table Number:</strong> {order.tableNumber}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <h3 className="font-semibold mt-4">Items</h3>
          {orderDetails.items.length > 0 ? (
            <ul className="list-disc pl-5">
              {orderDetails.items.map((item, index) => (
                <li key={index}>
                  {item.quantity}x {item.name} @ LKR {item.price.toLocaleString()} = LKR {item.itemTotal.toLocaleString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>No items found.</p>
          )}
          <p><strong>Subtotal:</strong> LKR {orderDetails.subtotal.toLocaleString()}</p>
          <p><strong>Tax (10%):</strong> LKR {orderDetails.tax.toLocaleString()}</p>
          <p><strong>Total:</strong> LKR {orderDetails.total.toLocaleString()}</p>
        </div>
        <div className="flex gap-4 mt-4 justify-end">
          <button
            onClick={() => onEdit()}
            className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800"
          >
            Edit
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}