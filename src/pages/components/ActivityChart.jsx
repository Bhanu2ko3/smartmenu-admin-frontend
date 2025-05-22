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
  const { dailySales, weeklySales } = api.getDashboardData();

  const dailyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Sales (LKR)",
        data: dailySales,
        borderColor: "#1e3a8a",
        backgroundColor: "rgba(30, 58, 138, 0.2)",
        fill: true,
      },
    ],
  };

  const weeklyData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Weekly Sales (LKR)",
        data: weeklySales,
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245, 158, 11, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Sales Activity" },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: (value) => `LKR ${value.toLocaleString()}` },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Sales Activity</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm text-gray-500 mb-2">Daily Sales</h3>
          <Line data={dailyData} options={options} />
        </div>
        <div>
          <h3 className="text-sm text-gray-500 mb-2">Weekly Sales</h3>
          <Line data={weeklyData} options={options} />
        </div>
      </div>
    </div>
  );
}