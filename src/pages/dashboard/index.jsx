
import DashboardLayout from "../components/DashboardLayout";
import MetricsCard from "../components/MetricsCard";
import PopularItems from "../components/PopularItems";
import ActivityChart from "../components/ActivityChart";
import { api } from "../lib/api";

export default function Dashboard() {
  const { menuItemsCount, ordersSummary } = api.getDashboardData();

  return (
    <DashboardLayout>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem", color: "#1f2937" }}>
        Dashboard Overview
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem", marginBottom: "1.5rem" }}>
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
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        <PopularItems />
        <ActivityChart />
      </div>
    </DashboardLayout>
  );
}