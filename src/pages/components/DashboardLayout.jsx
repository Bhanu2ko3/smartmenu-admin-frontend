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
        className={`fixed top-0 left-0 h-full w-64 bg-indigo-900 text-white transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold flex items-center">
            <span className="mr-2">🍴</span> Smart Food Admin
          </h1>
          <button
            className="md:hidden mb-4 text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            Close
          </button>
          <nav>
            <ul className="p-4 space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={`flex items-center p-3 rounded-md text-white hover:bg-indigo-800 ${
                      router.pathname === item.path ? "bg-amber-500 text-white" : ""
                    }`}
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
      <div className="flex-1 p-6 md:ml-64">
        <header className="md:hidden bg-white shadow-sm p-4 flex justify-between items-center">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-2xl text-indigo-900"
          >
            ☰
          </button>
          <h1 className="text-xl font-bold text-gray-900">Smart Food Admin</h1>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}