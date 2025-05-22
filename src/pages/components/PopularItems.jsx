// components/PopularItems.js
import { api } from "../lib/api";

export default function PopularItems() {
  const { popularItems } = api.getDashboardData();

  return (
    <div className="list-container">
      <h2>Popular Items</h2>
      <ul>
        {popularItems.map((item) => (
          <li key={item.id}>
            <div>
              <p>{item.name}</p>
              <p className="subtext">{item.orders} orders</p>
            </div>
            <p className="revenue">LKR {item.revenue.toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}