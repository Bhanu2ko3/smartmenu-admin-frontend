// pages/orders.js
import DashboardLayout from "../components/DashboardLayout";
import OrdersTable from "../components/OrdersTable";

export default function Orders() {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Orders</h2>
      <OrdersTable />
    </DashboardLayout>
  );
}