export default function ViewFoodModal({ isOpen, onClose, food }) {
  if (!isOpen || !food) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-[600px] max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-4">View Food Item</h2>
        <div className="grid gap-2">
          <p className="text-sm text-gray-900">
            <strong className="font-semibold">ID:</strong> {food.id}
          </p>
          <p className="text-sm text-gray-900">
            <strong className="font-semibold">Name:</strong> {food.name}
          </p>
          <p className="text-sm text-gray-900">
            <strong className="font-semibold">Description:</strong>{" "}
            {food.description || "N/A"}
          </p>
          <p className="text-sm text-gray-900">
            <strong className="font-semibold">Category:</strong> {food.category}
          </p>
          <p className="text-sm text-gray-900">
            <strong className="font-semibold">Price (LKR):</strong>{" "}
            {food.price.toLocaleString()}
          </p>
          <p className="text-sm text-gray-900">
            <strong className="font-semibold">Rating:</strong>{" "}
            {food.rating.toFixed(1)}
          </p>
          <p className="text-sm text-gray-900">
            <strong className="font-semibold">Origin:</strong>{" "}
            {food.origin || "N/A"}
          </p>
          <p className="text-sm text-gray-900">
            <strong className="font-semibold">Preparation Time (min):</strong>{" "}
            {food.preparationTime || "N/A"}
          </p>
          <p className="text-sm text-gray-900">
            <strong className="font-semibold">Availability:</strong>{" "}
            {food.availability ? "Available" : "Unavailable"}
          </p>
          <p className="text-sm text-gray-900">
            <strong className="font-semibold">Dietary:</strong> {food.dietary}
          </p>
          <p className="text-sm text-gray-900">
            <strong className="font-semibold">Calories:</strong>{" "}
            {food.calories || "N/A"}
          </p>
          <p className="text-sm text-gray-900">
            <strong className="font-semibold">Protein (g):</strong>{" "}
            {food.protein || "N/A"}
          </p>
          <p className="text-sm text-gray-900">
            <strong className="font-semibold">Carbs (g):</strong>{" "}
            {food.carbs || "N/A"}
          </p>
          <p className="text-sm text-gray-900">
            <strong className="font-semibold">Fats (g):</strong>{" "}
            {food.fats || "N/A"}
          </p>
          <p className="text-sm text-gray-900">
            <strong className="font-semibold">Flavor:</strong>{" "}
            {food.flavor || "N/A"}
          </p>
          <p className="text-sm text-gray-900">
            <strong className="font-semibold">Spice Level:</strong>{" "}
            {food.spiceLevel || "N/A"}
          </p>
          <p className="text-sm text-gray-900">
            <strong className="font-semibold">Ingredients:</strong>{" "}
            {food.ingredients?.join(", ") || "N/A"}
          </p>
          <p className="text-sm text-gray-900">
            <strong className="font-semibold">Serving Size:</strong>{" "}
            {food.servingSize || "N/A"}
          </p>
          <p className="text-sm text-gray-900">
            <strong className="font-semibold">Tags:</strong>{" "}
            {food.tags?.join(", ") || "N/A"}
          </p>
          <p className="text-sm text-gray-900">
            <strong className="font-semibold">Image URL:</strong>{" "}
            {food.imageUrl || "N/A"}
          </p>
          <p className="text-sm text-gray-900">
            <strong className="font-semibold">3D Model URL:</strong>{" "}
            {food.model3DUrl || "N/A"}
          </p>
        </div>
        <div className="flex gap-4 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}