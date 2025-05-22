// pages/menu-items.js
import DashboardLayout from "../components/DashboardLayout";
import MenuItemsTable from "../components/MenuItemsTable";

export default function MenuItems() {
  return (
    <DashboardLayout>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
        Menu Items
      </h2>
      <MenuItemsTable />
    </DashboardLayout>
  );
}