import { FaUserCircle } from 'react-icons/fa';

export default function Navbar() {
  return (
    <div className="w-full bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Admin Panel</h1>
      <div className="flex items-center space-x-4">
        <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
          <FaUserCircle size={24} />
        </button>
        <button className="p-2 bg-red-500 text-white rounded hover:bg-red-600">Logout</button>
      </div>
    </div>
  );
}