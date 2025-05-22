import { FaHome, FaUtensils, FaShoppingCart, FaUsers, FaChartBar } from 'react-icons/fa';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold">Smart Menu Admin</div>
      <nav className="flex-1 p-4">
        <ul>
          <li className="mb-4">
            <Link href="/dashboard" className="flex items-center p-2 hover:bg-gray-700 rounded">
              <FaHome className="mr-2" /> Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/menu" className="flex items-center p-2 hover:bg-gray-700 rounded">
              <FaUtensils className="mr-2" /> Menu Management
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/orders" className="flex items-center p-2 hover:bg-gray-700 rounded">
              <FaShoppingCart className="mr-2" /> Orders
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/customers" className="flex items-center p-2 hover:bg-gray-700 rounded">
              <FaUsers className="mr-2" /> Customers
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/analytics" className="flex items-center p-2 hover:bg-gray-700 rounded">
              <FaChartBar className="mr-2" /> Analytics
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}