// components/MetricsCard.js
export default function MetricsCard({ title, value, icon, subtext }) {
  return (
    <div className="card">
      <div className="flex items-center space-x-4">
        <div className="icon">{icon}</div>
        <div>
          <h3>{title}</h3>
          <p className="value">{value}</p>
          {subtext && <p className="subtext">{subtext}</p>}
        </div>
      </div>
    </div>
  );
}