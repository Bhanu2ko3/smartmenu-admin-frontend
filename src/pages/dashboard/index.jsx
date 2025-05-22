import DashboardLayout from "../components/DashboardLayout";
import MetricsCard from "../components/MetricsCard";
import PopularItems from "../components/PopularItems";
import ActivityChart from "../components/ActivityChart";
import { api } from "../lib/api";

export default function Dashboard() {
  const { menuItemsCount, ordersSummary } = api.getDashboardData();

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <MetricsCard
          title="Menu Items"
          value={menuItemsCount}
          icon="🍽️"
          subtext="Total active items"
        />
        <MetricsCard
          title="Orders Summary"
          value={ordersSummary.total}
          icon="📦"
          subtext={`${ordersSummary.active} active, ${ordersSummary.completed} completed`}
        />
        <MetricsCard
          title="Total Sales"
          value="LKR 1,250,000"
          icon="💰"
          subtext="This month"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PopularItems />
        <ActivityChart />
      </div>
    </DashboardLayout>
  );
}