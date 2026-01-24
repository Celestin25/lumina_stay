"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{username: string, role: string} | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
        router.push("/auth");
        return;
    }
    setUser({
        username: localStorage.getItem("username") || "User",
        role: localStorage.getItem("user_role") || "user"
    });
  }, [router]);

  if (!user) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Welcome back, {user.username}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
             Role: <span className="capitalize font-semibold text-emerald-600">{user.role}</span>
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Mock Booking Card */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">Upcoming Stays</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">0</dd>
            <p className="mt-2 text-sm text-gray-500">You have no upcoming bookings.</p>
          </div>
        </div>

         <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">Saved Properties</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">3</dd>
          </div>
        </div>

         <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">Wallet Balance</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">0.00 MAD</dd>
          </div>
        </div>
      </div>

      {user.role === "superadmin" && (
        <div className="mt-10 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
            <p className="font-bold">Super Admin Access</p>
            <p>You have access to the <a href="/admin" className="underline">Super Admin Dashboard</a>.</p>
        </div>
      )}
    </div>
  );
}
