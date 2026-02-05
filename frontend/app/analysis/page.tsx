"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Analysis() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
        router.push("/auth");
        return;
    }
    
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
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!data) return <div className="text-center py-20">Failed to load data.</div>;

  // Transform Data for Charts
  const cities = Object.keys(data.average_prices);
  const priceChartData = cities.map(city => ({
    name: city,
    Rent: data.average_prices[city].Rent,
    Buy: data.average_prices[city].Buy
  }));

  const propertyTypeData = Object.keys(data.property_counts).map(type => ({
    name: type,
    value: data.property_counts[type]
  }));

  const COLORS = ['#059669', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0'];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
             <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Real Estate Market Analysis</h1>
             <p className="mt-4 text-lg text-gray-600">Deep insights into the Moroccan housing market based on our latest dataset.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-emerald-500">
                <p className="text-sm font-medium text-gray-500 uppercase">Total Listings Tracked</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{data.total_listings.toLocaleString()}</p>
            </div>
             <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-blue-500">
                <p className="text-sm font-medium text-gray-500 uppercase">Top City (Volume)</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">Casablanca</p>
            </div>
             <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-purple-500">
                <p className="text-sm font-medium text-gray-500 uppercase">Market Trend</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">Stable</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Rent Prices Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Average Rent Prices (MAD/Month)</h3>
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

            {/* Buy Prices Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                 <h3 className="text-lg font-semibold text-gray-800 mb-6">Average Property Prices (MAD)</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={priceChartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis tickFormatter={(value) => `${value / 1000}k`} />
                            <RechartsTooltip 
                                formatter={(value: number | undefined) => (value ? value.toLocaleString() + ' MAD' : '0 MAD')}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Bar dataKey="Buy" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Property Type Distribution */}
            <div className="bg-white p-6 rounded-2xl shadow-lg lg:col-span-2">
                 <h3 className="text-lg font-semibold text-gray-800 mb-6">Property Type Distribution</h3>
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
      </div>
    </div>
  );
}
