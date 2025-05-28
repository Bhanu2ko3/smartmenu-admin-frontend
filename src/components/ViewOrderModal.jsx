"use client";
import { useMemo } from "react";

export default function ViewOrderModal({
  isOpen,
  onClose,
  order,
  onEdit,
  menuItems = [],
}) {
  if (!isOpen || !order) return null;

  const orderDetails = useMemo(() => {
    const items = order.items.map((item) => {
      const menuItem =
        menuItems && Array.isArray(menuItems)
          ? menuItems.find((m) => m._id === item.foodId)
          : null;
      return {
        quantity: item.quantity,
        name: menuItem ? menuItem.name : "Unknown Item",
        price: menuItem ? menuItem.price : 0,
        itemTotal: menuItem ? menuItem.price * item.quantity : 0,
      };
    });

    const subtotal = items.reduce((sum, item) => sum + item.itemTotal, 0);
    const taxRate = 0.1;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    return { items, subtotal, tax, total };
  }, [order.items, menuItems]);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    preparing: "bg-blue-100 text-blue-800",
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-200 bg-gray-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span>Order #{order._id.slice(-6).toUpperCase()}</span>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  statusColors[order.status] || "bg-gray-100 text-gray-800"
                }`}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {new Date(order.createdAt).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:bg-gray-200/50 hover:text-gray-600 transition-all p-1 rounded-full"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
          {/* Table Information */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              Table Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-gray-50/50 p-4 rounded-lg border border-gray-100">
                <p className="text-xs font-medium text-gray-500 mb-1">
                  Table Number
                </p>
                <p className="font-medium text-gray-800 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 p-1 rounded-lg w-6 h-6 flex items-center justify-center">
                    #
                  </span>
                  {order.tableNumber}
                </p>
              </div>
              <div className="bg-gray-50/50 p-4 rounded-lg border border-gray-100">
                <p className="text-xs font-medium text-gray-500 mb-1">
                  Order Type
                </p>
                <p className="font-medium text-gray-800 flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {order.orderType || "Dine-in"}
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              Order Items
            </h3>
            {orderDetails.items.length > 0 ? (
              <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
                {orderDetails.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="bg-gray-100 text-gray-800 rounded-lg w-8 h-8 flex items-center justify-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        {item.notes && (
                          <p className="text-xs text-gray-500 mt-1">
                            {item.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="font-medium text-gray-900">
                      LKR {item.itemTotal.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50/50 p-4 rounded-lg border border-gray-200 text-center text-gray-500">
                No items found in this order
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"
                />
              </svg>
              Order Summary
            </h3>
            <div className="bg-gray-50/50 rounded-lg p-4 border border-gray-200 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  LKR {orderDetails.subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span className="text-gray-600">Tax (10%)</span>
                <span className="font-medium">
                  LKR {orderDetails.tax.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-gray-900 font-semibold">Total</span>
                <span className="text-gray-900 font-bold text-lg">
                  LKR {orderDetails.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-500">
            {order.updatedAt && (
              <p>Last updated: {new Date(order.updatedAt).toLocaleString()}</p>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Close
            </button>
            <button
              onClick={() => onEdit()}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
