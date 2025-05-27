export default function MetricsCard({ title, value, icon, subtext }) {
  return (
    <div className="bg-white/80 rounded-2xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)] transition-shadow duration-200 ease-out backdrop-blur-md border border-white/20">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 text-white text-lg shadow-sm">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xs font-medium text-gray-600 uppercase tracking-widest">
            {title}
          </h3>
          <p className="text-xl font-semibold text-gray-900 mt-0.5">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
          {subtext && (
            <p className="text-xs text-gray-500/90 mt-0.5">{subtext}</p>
          )}
        </div>
      </div>
    </div>
  );
}
