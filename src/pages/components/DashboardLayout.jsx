// components/DashboardLayout.js
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: "🏠" },
    { name: "Menu Items", path: "/menu", icon: "🍽️" },
    { name: "Orders", path: "/orders", icon: "📦" },
    { name: "Settings", path: "/settings", icon: "⚙️" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`sidebar ${isSidebarOpen ? "" : "sidebar-hidden"}`}
      >
        <div className="p-6">
          <h1>
            <span className="mr-2">🍴</span> Smart Food Admin
          </h1>
          <button
            className="md:hidden mb-4 text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            Close
          </button>
          <nav>
            <ul>
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={`flex items-center ${router.pathname === item.path ? "active" : ""}`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-2xl"
            style={{ color: "#1e3a8a" }}
          >
            ☰
          </button>
          <h1>Smart Food Admin</h1>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}