'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export default function FoodsPage() {
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    fetch('${API_URL}/api/foods').then(res => res.json()).then(setFoods);
  }, []);

  const deleteFood = async (id) => {
    if (confirm('Are you sure you want to delete this food?')) {
      await fetch(`/api/foods/${id}`, { method: 'DELETE' });
      setFoods(foods.filter(f => f.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Foods</h1>
        <Link href="/foods/add" className="bg-blue-500 text-white px-4 py-2 rounded">Add Food</Link>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {foods.map(food => (
            <tr key={food.id}>
              <td className="border px-4 py-2">{food.name}</td>
              <td className="border px-4 py-2">{food.category}</td>
              <td className="border px-4 py-2">${food.price}</td>
              <td className="border px-4 py-2 space-x-2">
                <Link href={`/foods/${food.id}`} className="text-blue-600">Edit</Link>
                <Link href={`/preview/${food.id}`} className="text-green-600">Preview</Link>
                <button onClick={() => deleteFood(food.id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}