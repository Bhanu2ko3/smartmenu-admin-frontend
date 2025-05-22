'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddFoodPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '', description: '', category: '', price: '', rating: '', origin: '', preparationTime: '',
    availability: false, dietary: '', calories: '', protein: '', carbs: '', fats: '',
    flavor: '', spiceLevel: '', ingredients: '', servingSize: '', tags: '', imageUrl: '', model3DUrl: ''
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: parseFloat(form.price),
      rating: parseFloat(form.rating),
      preparationTime: parseInt(form.preparationTime),
      calories: parseInt(form.calories),
      protein: parseInt(form.protein),
      carbs: parseInt(form.carbs),
      fats: parseInt(form.fats),
      spiceLevel: parseInt(form.spiceLevel),
      ingredients: form.ingredients.split(',').map(i => i.trim()),
      tags: form.tags.split(',').map(t => t.trim())
    };
    await fetch('/api/foods', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    router.push('/dashboard/foods');
  };

  return (
    <div>
      <h1 className=" text-2xl font-bold mb-4">Add Food</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {Object.keys(form).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="capitalize">{key}</label>
            {key === 'availability' ? (
              <input type="checkbox" name={key} checked={form[key]} onChange={handleChange} />
            ) : (
              <input type="text" name={key} value={form[key]} onChange={handleChange} className="border p-2" />
            )}
          </div>
        ))}
        <button type="submit" className="col-span-2 bg-green-600 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
}
