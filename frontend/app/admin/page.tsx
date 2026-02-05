"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { HomeIcon, ChartBarIcon, UsersIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon, CalculatorIcon } from "@heroicons/react/24/outline";
import PredictionForm from "@/components/PredictionForm";

export default function AdminDashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("user_role");
    if (role !== "superadmin") {
        router.push("/dashboard");
    } else {
        setAuthorized(true);
        // Fetch Analysis Data
        fetch("http://localhost:8000/analysis")
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  if (!authorized) return null;

  // Chart Data Preparation
  const cities = data ? Object.keys(data.average_prices) : [];
  const priceChartData = cities.map(city => ({
    name: city,
    Rent: data.average_prices[city].Rent,
    Buy: data.average_prices[city].Buy
  }));
  
  const propertyTypeData = data ? Object.keys(data.property_counts).map(type => ({
      name: type,
      value: data.property_counts[type]
  })) : [];

  const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];

  const navigation = [
    { name: 'Overview', icon: HomeIcon, id: 'overview' },
    { name: 'Market Analytics', icon: ChartBarIcon, id: 'analytics' },
    { name: 'Price Estimator', icon: CalculatorIcon, id: 'estimator' },
    { name: 'User Management', icon: UsersIcon, id: 'users' },
    { name: 'Settings', icon: Cog6ToothIcon, id: 'settings' },
  ];
  
  const handleNavigation = (id: string) => {
      setActiveTab(id);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col fixed inset-y-0 z-50 bg-slate-900 text-white">
        <div className="flex h-20 items-center border-b border-slate-800 px-4">
             <button
                onClick={() => router.push("/")}
                className="group flex w-full items-center rounded-md px-3 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
            >
                <HomeIcon className="mr-3 h-6 w-6 flex-shrink-0" aria-hidden="true" />
                Back to Website
            </button>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <nav className="mt-1 flex-1 space-y-2 px-4">
                {navigation.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => handleNavigation(item.id)}
                        className={`group flex w-full items-center rounded-md px-3 py-3 text-sm font-medium transition-all ${
                            activeTab === item.id ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                    >
                        <item.icon className="mr-3 h-6 w-6 flex-shrink-0" aria-hidden="true" />
                        {item.name}
                    </button>
                ))}
            </nav>
        </div>
        <div className="border-t border-slate-800 p-4">
            <button onClick={handleLogout} className="group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all">
                <ArrowRightOnRectangleIcon className="mr-3 h-6 w-6 text-slate-400 group-hover:text-white" />
                Sign Out
            </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:pl-64 overflow-y-auto">
        <main className="flex-1 py-10">
            <div className="px-4 sm:px-6 lg:px-8">
                
                {/* Header with Profile */}
                <div className="flex items-center justify-between mb-8">
                    <div className="min-w-0 flex-1">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                            {navigation.find(n => n.id === activeTab)?.name}
                        </h2>
                    </div>
                    {/* User Profile */}
                    <div className="flex md:ml-4">
                        <img className="h-12 w-12 rounded-full object-cover ring-2 ring-emerald-500 shadow-sm" src="/celestin.png" alt="Celestin" />
                    </div>
                </div>

                {/* Content Area */}
                {loading ? (
                    <div className="flex justify-center items-center h-96">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
                    </div>
                ) : (
                    <>
                        {/* OVERVIEW TAB */}
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                                     <div className="bg-white overflow-hidden rounded-xl shadow-sm border border-gray-100 px-4 py-5 sm:p-6 transition-all hover:shadow-md">
                                        <dt className="truncate text-sm font-medium text-gray-500">Total Listings</dt>
                                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{data?.total_listings?.toLocaleString()}</dd>
                                        <dd className="mt-2 text-sm text-emerald-600 font-medium">↑ 12% increase</dd>
                                    </div>
                                    <div className="bg-white overflow-hidden rounded-xl shadow-sm border border-gray-100 px-4 py-5 sm:p-6 transition-all hover:shadow-md">
                                        <dt className="truncate text-sm font-medium text-gray-500">Active Users</dt>
                                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">1,234</dd>
                                        <dd className="mt-2 text-sm text-emerald-600 font-medium">↑ 5.4% increase</dd>
                                    </div>
                                    <div className="bg-white overflow-hidden rounded-xl shadow-sm border border-gray-100 px-4 py-5 sm:p-6 transition-all hover:shadow-md">
                                        <dt className="truncate text-sm font-medium text-gray-500">Avg. Rent Price</dt>
                                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">6,500 MAD</dd>
                                    </div>
                                    <div className="bg-white overflow-hidden rounded-xl shadow-sm border border-gray-100 px-4 py-5 sm:p-6 transition-all hover:shadow-md">
                                        <dt className="truncate text-sm font-medium text-gray-500">System Status</dt>
                                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-emerald-600">Healthy</dd>
                                        <dd className="mt-2 text-sm text-gray-500">Updated 1m ago</dd>
                                    </div>
                                </div>

                                {/* Recent Activity Table */}
                                <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900">Recent User Activity</h3>
                                        <div className="mt-4 flow-root">
                                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                                    <table className="min-w-full divide-y divide-gray-300">
                                                        <thead>
                                                            <tr>
                                                                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">User</th>
                                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Action</th>
                                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
                                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Time</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-gray-200">
                                                            {[1, 2, 3, 4, 5].map((item) => (
                                                                <tr key={item}>
                                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">User_{item}</td>
                                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Ran Prediction Analysis</td>
                                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Subscriber</td>
                                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item * 12} mins ago</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ANALYTICS TAB */}
                        {activeTab === 'analytics' && (
                             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-6">Rent Market Overview</h3>
                                    <div className="h-80">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={priceChartData}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <RechartsTooltip 
                                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                />
                                                <Bar dataKey="Rent" fill="#10b981" radius={[4, 4, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-6">Property Acquisition Costs</h3>
                                    <div className="h-80">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={priceChartData}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                <XAxis dataKey="name" />
                                                <YAxis tickFormatter={(val) => `${val/1000}k`} />
                                                <RechartsTooltip 
                                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                />
                                                <Bar dataKey="Buy" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
                                     <h3 className="text-lg font-semibold text-gray-800 mb-6">Inventory Distribution</h3>
                                     <div className="h-80 flex justify-center">
                                        <ResponsiveContainer width="100%" height="100%">
                                             <PieChart>
                                                <Pie
                                                    data={propertyTypeData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={80}
                                                    outerRadius={120}
                                                    fill="#8884d8"
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    {propertyTypeData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <RechartsTooltip />
                                                <Legend verticalAlign="bottom" height={36}/>
                                            </PieChart>
                                        </ResponsiveContainer>
                                     </div>
                                </div>
                            </div>
                        )}

                        {/* PRICE ESTIMATOR TAB */}
                        {activeTab === 'estimator' && (
                             <div className="max-w-4xl mx-auto">
                                <PredictionForm />
                             </div>
                        )}


                        {/* USERS TAB (Mock) */}
                        {activeTab === 'users' && (
                            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-8 text-center">
                                <UsersIcon className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-semibold text-gray-900">No users</h3>
                                <p className="mt-1 text-sm text-gray-500">Get started by inviting some users to your platform.</p>
                                <div className="mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                                    >
                                        <UsersIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                                        Invite Users
                                    </button>
                                </div>
                            </div>
                        )}

                         {/* SETTINGS TAB (Mock) */}
                         {activeTab === 'settings' && (
                             <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-6">
                                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">System Settings</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="flex-grow flex flex-col">
                                            <span className="text-sm font-medium text-gray-900">Maintenance Mode</span>
                                            <span className="text-sm text-gray-500">Prevents users from accessing the system</span>
                                        </span>
                                        <button className="bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2">
                                            <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                                        </button>
                                    </div>
                                    <hr className="border-gray-200" />
                                     <div className="flex items-center justify-between">
                                        <span className="flex-grow flex flex-col">
                                            <span className="text-sm font-medium text-gray-900">API Access</span>
                                            <span className="text-sm text-gray-500">Enable public API endpoints</span>
                                        </span>
                                        <button className="bg-emerald-600 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2">
                                            <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                                        </button>
                                    </div>
                                </div>
                             </div>
                         )}
                    </>
                )}
            </div>
        </main>
      </div>
    </div>
  );
}
