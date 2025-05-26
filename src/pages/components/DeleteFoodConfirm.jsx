'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function DeleteFoodConfirm({ isOpen, onClose, onConfirm, foodName }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await onConfirm();
      toast.success(`"${foodName}" deleted successfully`);
      onClose();
    } catch (err) {
      toast.error(`Failed to delete "${foodName}": ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-[400px]">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Confirm Delete</h2>
        <p className="text-sm text-gray-900 mb-6">Are you sure you want to delete "{foodName}"?</p>
        <div className="flex flex-col gap-2">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
            onClick={handleConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Deleting...' : 'Delete'}
          </button>
          <button
            className="px-4 py-2 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300 disabled:opacity-50"
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}