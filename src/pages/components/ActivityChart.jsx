import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { api } from "../lib/api";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ActivityChart() {
  const [dailySales, setDailySales] = useState([]);
  const [weeklySales, setWeeklySales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { dailySales, weeklySales } = await api.getDashboardData();
        setDailySales(dailySales || [0, 0, 0, 0, 0, 0, 0]); // Fallback to zeros if undefined
        setWeeklySales(weeklySales || [0, 0, 0, 0]); // Fallback to zeros if undefined
      } catch (err) {
        setError("Failed to load sales data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Daily Sales Data
  const dailyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Sales (LKR)",
        data: dailySales,
        borderColor: "#1e3a8a",
        backgroundColor: "rgba(30, 58, 138, 0.2)",
        fill: true,
        tension: 0.4, // Smooth line
      },
    ],
  };

  // Weekly Sales Data
  const weeklyData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Weekly Sales (LKR)",
        data: weeklySales,
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245, 158, 11, 0.2)",
        fill: true,
        tension: 0.4, // Smooth line
      },
    ],
  };

  // Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to fill container
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Sales Activity" },
      tooltip: {
        callbacks: {
          label: (context) => `LKR ${context.parsed.y.toLocaleString("si-LK", { currency: "LKR" })}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `LKR ${value.toLocaleString("si-LK", { currency: "LKR" })}`,
        },
      },
    },
  };

  // Conditional Rendering
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Sales Activity</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Sales Activity</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 ">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Sales Activity</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-80">
          <h3 className="text-sm text-gray-500 mb-2">Daily Sales</h3>
          <Line data={dailyData} options={options} />
        </div>
        <div className="h-80">
          <h3 className="text-sm text-gray-500 mb-2">Weekly Sales</h3>
          <Line data={weeklyData} options={options} />
        </div>
      </div>
    </div>
  );
}