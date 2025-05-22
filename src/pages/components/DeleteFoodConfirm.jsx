export default function DeleteFoodConfirm({ isOpen, onClose, onConfirm, foodName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-[400px]">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Confirm Delete</h2>
        <p className="text-sm text-gray-900 mb-6">Are you sure you want to delete "{foodName}"?</p>
        <div className="flex flex-col gap-2">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            onClick={onConfirm}
          >
            Delete
          </button>
          <button
            className="px-4 py-2 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}