export default function TableOccupancy({ tableOccupancy }) {
  if (!tableOccupancy || !Array.isArray(tableOccupancy)) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Table Occupancy</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse" aria-label="Table occupancy table">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left font-semibold text-gray-700">Table Number</th>
              <th className="p-3 text-left font-semibold text-gray-700">Orders</th>
              <th className="p-3 text-left font-semibold text-gray-700">Last Used</th>
            </tr>
          </thead>
          <tbody>
            {tableOccupancy.map((table) => (
              <tr key={table.tableNumber} className="border-b border-gray-200">
                <td className="p-3">{table.tableNumber}</td>
                <td className="p-3">{table.orders}</td>
                <td className="p-3">{new Date(table.lastUsed).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}