// components/DeleteOrderConfirm.js
export default function DeleteOrderConfirm({ isOpen, onClose, onConfirm, orderId }) {
  const handleConfirm = () => {
    onConfirm(orderId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
      aria-label="Delete order confirmation modal"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Confirm Delete</h2>
        <p className="text-gray-700 mb-4">
          Are you sure you want to delete order {orderId}? This action cannot be undone.
        </p>
        <div className="flex gap-4 justify-end">
          <button
            onClick={handleConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
          >
            Cancel
        </button>
        </div>
      </div>
    </div>
  );
}