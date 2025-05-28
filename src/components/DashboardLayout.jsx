import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Menu Items", path: "/menu", icon: "🍔" },
    { name: "Orders", path: "/orders", icon: "📦" },
    { name: "Analytics", path: "/analytics", icon: "📈" },
    { name: "Settings", path: "/settings", icon: "⚙️" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Enhanced Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-800 transform transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-5 flex flex-col h-full">
          {/* Logo & Close Button */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="mr-3 p-2 rounded-lg bg-indigo-600/10">
                <span className="text-2xl text-indigo-400">🍽️</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
                FoodDash
              </h1>
            </div>
            <button
              className="md:hidden text-gray-400 hover:text-white transition-colors"
              onClick={() => setIsSidebarOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                      router.pathname === item.path
                        ? "bg-gray-700/50 text-white shadow-md"
                        : "text-gray-300 hover:bg-gray-700/30 hover:text-white"
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <span
                      className={`text-xl ${
                        router.pathname === item.path
                          ? "text-indigo-400"
                          : "text-gray-400"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                    {router.pathname === item.path && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-indigo-400"></span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Profile */}
          <div className="mt-auto pt-4 border-t border-gray-700/50">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700/30 transition-colors cursor-pointer group">
              <div className="h-9 w-9 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 group-hover:border-indigo-500/40 transition-colors">
                <span className="text-lg">👤</span>
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-white truncate">
                  Admin User
                </p>
                <p className="text-xs text-gray-400 truncate">
                  admin@fooddash.com
                </p>
              </div>
              <button className="ml-auto text-gray-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 transition-all duration-300">
        {/* Enhanced Topbar */}
        <header className="bg-white shadow-sm px-6 py-3 flex justify-between items-center sticky top-0 z-20 backdrop-blur-sm bg-opacity-90 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-md hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              {navItems.find((item) => router.pathname === item.path)?.name ||
                "Dashboard"}
              {router.pathname !== "/" && (
                <span className="text-sm font-normal text-gray-400">/</span>
              )}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
              aria-label="Notifications"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
            </button>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-700">Admin User</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 cursor-pointer border-2 border-indigo-100 hover:border-indigo-200 transition-colors">
                <span className="text-sm">AU</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 bg-gradient-to-b from-gray-50 to-gray-100 min-h-[calc(100vh-73px)]">
          <div className="max-w-7xl mx-auto">
            {/* Enhanced Card Container */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200/70">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
