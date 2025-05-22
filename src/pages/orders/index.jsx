// pages/orders.js
import DashboardLayout from "../components/DashboardLayout";
import OrdersTable from "../components/OrdersTable";

export default function Orders() {
  return (
    <DashboardLayout>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
        Orders
      </h2>
      <OrdersTable />
    </DashboardLayout>
  );
}