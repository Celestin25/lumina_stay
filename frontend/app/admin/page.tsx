"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("user_role");
    if (role !== "superadmin") {
        router.push("/dashboard");
    } else {
        setAuthorized(true);
    }
  }, [router]);

  if (!authorized) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Super Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">1,234</p>
            <span className="text-green-600 text-sm">↑ 12% from last month</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">450,000 MAD</p>
            <span className="text-green-600 text-sm">↑ 8% from last month</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium">Active Listings</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">856</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium">Pending Approvals</h3>
            <p className="text-2xl font-bold text-orange-600 mt-2">12</p>
        </div>
      </div>

       <div className="mt-8 bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">Recent Activity</h3>
            <div className="mt-4 border-t border-gray-100">
                <ul role="list" className="divide-y divide-gray-100">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <li key={item} className="flex gap-x-4 py-5">
                            <div className="flex-auto">
                                <div className="flex items-baseline justify-between gap-x-4">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">New User Registration</p>
                                    <p className="flex-none text-xs text-gray-500">1h ago</p>
                                </div>
                                <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-600">User_{item} joined the platform.</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
}
