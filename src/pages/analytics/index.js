import { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import AnalyticsMetrics from "../../components/AnalyticsMetrics";
import RevenueChart from "../../components/RevenueChart";
import TableOccupancy from "../../components/TableOccupancy";
import PopularItems from "../../components/PopularItems";
import { api } from "../../lib/api";

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await api.getAnalyticsData();
        console.log("Fetched analytics data:", data); // Debugging
        setAnalyticsData(data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        setError("Failed to load analytics data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return (
      <div className="p-4 space-y-4">
        {[...Array(3)].map((_, idx) => (
          <div key={idx} className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-300 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Analytics</h2>
        <div className="mb-4 p-4 rounded-md bg-red-100 text-red-700">
          {error}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Analytics</h2>
      {analyticsData && (
        <>
          <AnalyticsMetrics metrics={analyticsData.metrics} />
          <RevenueChart dailyOrders={analyticsData.dailyOrders} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PopularItems items={analyticsData.popularItems} />
            <TableOccupancy tableOccupancy={analyticsData.tableOccupancy} />
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
