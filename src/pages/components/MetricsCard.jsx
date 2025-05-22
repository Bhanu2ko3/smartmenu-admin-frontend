export default function MetricsCard({ title, value, icon, subtext }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4">
        <div className="text-4xl text-indigo-900">{icon}</div>
        <div>
          <h3 className="text-sm text-gray-500 font-medium">{title}</h3>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtext && <p className="text-xs text-gray-400">{subtext}</p>}
        </div>
      </div>
    </div>
  );
}