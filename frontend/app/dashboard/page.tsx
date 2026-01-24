
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { predictPrice } from "@/lib/api";

// Dynamically import map to avoid SSR issues with Leaflet
const MoroccoMap = dynamic(() => import("@/components/MoroccoMap"), { ssr: false });

export default function Dashboard() {
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Mock properties for the map initially
  const [properties, setProperties] = useState([
    { City: "Casablanca", Neighborhood: "Maârif", Price_MAD: 1200000, Latitude: 33.5731, Longitude: -7.5898, Property_Type: "Apartment" },
    { City: "Marrakech", Neighborhood: "Guéliz", Price_MAD: 1500000, Latitude: 31.6295, Longitude: -7.9811, Property_Type: "Villa" },
  ]);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock input collection - normally would use form state
    const mockInput = {
        City: "Casablanca",
        Neighborhood: "Maârif",
        Property_Type: "Apartment",
        Bedrooms: 3,
        Bathrooms: 2,
        Size_m2: 120,
        Has_Pool: 0,
        Has_Garden: 0,
        Is_Furnished: 1,
        Latitude: 33.57,
        Longitude: -7.58
    };

    try {
        const result = await predictPrice(mockInput);
        setPredictedPrice(result.predicted_price);
    } catch (err) {
        console.error(err);
        alert("Failed to predict. Is backend running?");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Input Form */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-fit">
          <h2 className="text-xl font-bold mb-4">Estimate Price</h2>
          <form onSubmit={handlePredict} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border">
                <option>Casablanca</option>
                <option>Marrakech</option>
                <option>Rabat</option>
                <option>Tangier</option>
              </select>
            </div>
            
            {/* ... Other fields shortened for demo ... */}
            
            <button 
                type="submit" 
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none disabled:opacity-50"
            >
                {loading ? "Calculating..." : "Predict Price"}
            </button>
          </form>

          {predictedPrice && (
            <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                <p className="text-sm text-emerald-800">Estimated Value:</p>
                <p className="text-2xl font-bold text-emerald-600">{predictedPrice.toLocaleString()} MAD</p>
                <button className="mt-3 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 text-sm">
                    Book / Make Offer
                </button>
            </div>
          )}
        </div>

        {/* Right: Map */}
        <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">Market Map</h2>
            <MoroccoMap properties={properties} />
        </div>

      </div>
    </div>
  );
}
