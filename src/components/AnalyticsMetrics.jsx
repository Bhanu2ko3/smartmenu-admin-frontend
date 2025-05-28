export default function AnalyticsMetrics({ metrics }) {
  if (!metrics) return null; // Prevent rendering if metrics is undefined or null

  const metricItems = [
    {
      title: "Total Orders",
      value: (metrics.totalOrders || 0).toLocaleString(),
      icon: "📋",
      color: "bg-blue-100 text-blue-900",
    },
    {
      title: "Total Revenue",
      value: `LKR ${(metrics.totalRevenue || 0).toLocaleString()}`,
      icon: "💰",
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Avg. Order Value",
      value: `LKR ${(metrics.avgOrderValue || 0).toFixed(2)}`,
      icon: "📊",
      color: "bg-amber-100 text-amber-700",
    },
    {
      title: "Active Tables",
      value: metrics.activeTables || 0,
      icon: "🍽️",
      color: "bg-red-100 text-red-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metricItems.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-lg shadow-lg p-4 flex items-center gap-4"
        >
          <div className={`p-3 rounded-full ${item.color}`}>
            <span className="text-xl">{item.icon}</span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700">{item.title}</h3>
            <p className="text-lg font-bold text-gray-900">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}