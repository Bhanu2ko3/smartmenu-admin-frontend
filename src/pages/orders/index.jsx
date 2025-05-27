import DashboardLayout from "../components/DashboardLayout";
import OrdersTable from "../components/OrdersTable";

export default function Orders() {
  return (
    <DashboardLayout>
      <OrdersTable />
    </DashboardLayout>
  );
}
