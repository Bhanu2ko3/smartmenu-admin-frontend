// components/ViewOrderModal.js
export default function ViewOrderModal({ isOpen, onClose, order, onEdit }) {
  if (!isOpen || !order) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 bg-opacity-30 flex items-center justify-center z-50"
      aria-label="View order modal"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Order Details - {order.id}</h2>
        <div className="grid gap-2 text-sm text-gray-700">
          <p><strong>Table Number:</strong> {order.tableNumber}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <h3 className="font-semibold mt-4">Items</h3>
          <ul className="list-disc pl-5">
            {order.itemDetails.map((item, index) => (
              <li key={index}>
                {item.quantity}x {item.name} @ LKR {item.price.toLocaleString()} = LKR{" "}
                {item.itemTotal.toLocaleString()}
              </li>
            ))}
          </ul>
          <p><strong>Subtotal:</strong> LKR {order.subtotal.toLocaleString()}</p>
          <p><strong>Tax ({(order.tax / order.subtotal * 100).toFixed(1)}%):</strong> LKR {order.tax.toLocaleString()}</p>
          <p><strong>Total:</strong> LKR {order.total.toLocaleString()}</p>
        </div>
        <div className="flex gap-4 mt-4 justify-end">
          <button
            onClick={() => onEdit(order)}
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