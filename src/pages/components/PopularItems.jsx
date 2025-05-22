import { api } from "../lib/api";

export default function PopularItems() {
  const { popularItems } = api.getDashboardData();

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Popular Items</h2>
      <ul className="list-none">
        {popularItems.map((item) => (
          <li
            key={item.id}
            className="flex justify-between py-2 border-b border-gray-200 last:border-b-0"
          >
            <div>
              <p className="text-base text-gray-900">{item.name}</p>
              <p className="text-xs text-gray-400">{item.orders} orders</p>
            </div>
            <p className="text-base font-bold text-green-600">
              LKR {item.revenue.toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}