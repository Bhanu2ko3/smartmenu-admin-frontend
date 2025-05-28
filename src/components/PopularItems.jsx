export default function PopularItems({ items = [] }) {
  return (
    <div className="bg-white/80 rounded-2xl p-5 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)] transition-shadow duration-200 ease-out backdrop-blur-md border border-white/20">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-xl">🍲</span> Top Selling Food Items
      </h3>

      {items.length === 0 ? (
        <p className="text-gray-500/90 text-sm">No data available</p>
      ) : (
        <ul className="space-y-3">
          {items.slice(0, 5).map((item) => (
            <li
              key={item.foodId}
              className="flex items-center justify-between bg-white/50 hover:bg-white/70 transition-all duration-200 ease-out rounded-xl p-3 border border-gray-100/50 backdrop-blur-sm"
            >
              <div>
                <p className="text-base font-medium text-gray-900">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500/90">ID: {item.foodId}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-indigo-600">
                  {item.quantitySold}
                  <span className="text-xs font-medium text-gray-500/90">
                    {" "}sold
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
