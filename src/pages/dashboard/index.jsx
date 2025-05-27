"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import MetricsCard from "../components/MetricsCard";
import PopularItems from "../components/PopularItems";
import ActivityChart from "../components/ActivityChart";
import { api } from "../../lib/api";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    menuItemsCount: 0,
    ordersSummary: { total: 0, pending: 0, preparing: 0, completed: 0 },
    mostSoldItems: [],
    totalSales: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await api.getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-700">Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  const { menuItemsCount, ordersSummary, mostSoldItems, totalSales } =
    dashboardData;

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <MetricsCard
          title="Total Orders"
          value={ordersSummary.total}
          icon="📦"
          subtext={`${ordersSummary.active} active orders`}
        />
        <MetricsCard
          title="Pending Orders"
          value={ordersSummary.pending}
          icon="⏳"
          subtext="Orders waiting to be processed"
        />
        <MetricsCard
          title="Preparing Orders"
          value={ordersSummary.preparing}
          icon="🍳"
          subtext="Orders in preparation"
        />
        <MetricsCard
          title="Completed Orders"
          value={ordersSummary.completed}
          icon="✅"
          subtext="Orders successfully completed"
        />
        <MetricsCard
          title="Food Items"
          value={menuItemsCount}
          icon="🍽️"
          subtext="Total active menu items"
        />
        <MetricsCard
          title="Total Sales"
          value={`LKR ${totalSales.toLocaleString()}`}
          icon="💰"
          subtext="Sales this month"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PopularItems items={mostSoldItems} />
        <ActivityChart />
      </div>
    </DashboardLayout>
  );
}
