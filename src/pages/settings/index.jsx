// pages/settings.js
import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { api } from "../lib/api";
import { toast, ToastContainer } from "react-toastify";

export default function Settings() {
  const [settings, setSettings] = useState({
    restaurantName: "",
    currency: "",
    taxRate: 0,
    contactEmail: "",
    phone: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const data = api.getSettings();
      setSettings(data);
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setMessage(null);

    try {
      const formData = new FormData(e.target);
      const updatedSettings = {
        restaurantName: formData.get("restaurantName"),
        currency: formData.get("currency"),
        taxRate: Number(formData.get("taxRate")),
        contactEmail: formData.get("contactEmail"),
        phone: formData.get("phone"),
        address: formData.get("address"),
      };
      const result = api.updateSettings(updatedSettings);
      setSettings(result);
      toast.success("Settings updated successfully!");
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update settings. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Settings</h2>
      <div className="bg-white rounded-lg shadow-lg p-6">
        {message && (
          <div
            className={`mb-4 p-4 rounded-md ${
              message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Restaurant Name</label>
            <input
              type="text"
              name="restaurantName"
              value={settings.restaurantName}
              onChange={(e) => setSettings({ ...settings, restaurantName: e.target.value })}
              required
              className="p-2 border border-gray-300 rounded-md w-full max-w-[200px] focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Currency</label>
            <select
              name="currency"
              value={settings.currency}
              onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
              required
              className="p-2 border border-gray-300 rounded-md w-full max-w-[200px] focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
            >
              <option value="LKR">LKR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tax Rate (%)</label>
            <input
              type="number"
              name="taxRate"
              value={settings.taxRate * 100}
              onChange={(e) => setSettings({ ...settings, taxRate: Number(e.target.value) / 100 })}
              min="0"
              step="0.1"
              required
              className="p-2 border border-gray-300 rounded-md w-full max-w-[200px] focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Email</label>
            <input
              type="email"
              name="contactEmail"
              value={settings.contactEmail}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              required
              className="p-2 border border-gray-300 rounded-md w-full max-w-[200px] focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              required
              className="p-2 border border-gray-300 rounded-md w-full max-w-[200px] focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              name="address"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              rows="3"
              required
              className="p-2 border border-gray-300 rounded-md w-full max-w-[200px] focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/200"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 disabled:bg-blue-600"
            >
              {isSubmitting ? "Saving..." : "Save Settings"}
            </button>
            <button
              type="button"
              onClick={() => setSettings(api.getSettings())}
              disabled={isSubmitting}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 disabled:bg-gray-100"
            >
              Reset
            </button>
          </div>
        </form>
        <ToastContainer position="top-right" autoClose={7000} />
      </div>
    </DashboardLayout>
  );
}