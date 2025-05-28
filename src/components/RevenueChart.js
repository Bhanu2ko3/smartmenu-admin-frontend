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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function RevenueChart({ dailyOrders }) {
  if (!dailyOrders || !Array.isArray(dailyOrders)) return null; // Guard against undefined or invalid data

  const data = {
    labels: dailyOrders.map((item) => item.date),
    datasets: [
      {
        label: "Orders",
        data: dailyOrders.map((item) => item.count),
        borderColor: "#1e3a8a",
        backgroundColor: "rgba(30, 58, 138, 0.2)",
        yAxisID: "y",
      },
      {
        label: "Revenue (LKR)",
        data: dailyOrders.map((item) => item.revenue),
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        yAxisID: "y1",
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: { display: true, text: "Orders" },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        title: { display: true, text: "Revenue (LKR)" },
        grid: { drawOnChartArea: false },
      },
    },
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Daily Orders and Revenue (Last 7 Days)" },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <Line data={data} options={options} aria-label="Daily orders and revenue chart" />
    </div>
  );
}