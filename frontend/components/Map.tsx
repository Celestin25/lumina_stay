"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Dynamic import to avoid SSR issues with Leaflet
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

export default function PropertyMap() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="h-96 w-full bg-slate-200 animate-pulse rounded-xl"></div>;
  }

  // Morocco Coordinates
  const position: [number, number] = [31.7917, -7.0926]; 

  // Mock Property Data
  const properties = [
    { id: 1, lat: 33.5731, lng: -7.5898, title: "Luxury Apt Casablanca", price: "20,000 MAD" },
    { id: 2, lat: 31.6295, lng: -7.9811, title: "Riad in Marrakech", price: "35,000 MAD" },
    { id: 3, lat: 35.7595, lng: -5.8340, title: "Villa in Tangier", price: "45,000 MAD" },
    { id: 4, lat: 30.4278, lng: -9.5981, title: "Beach House Agadir", price: "25,000 MAD" },
  ];

  return (
    <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-lg border-4 border-white">
      <MapContainer center={position} zoom={6} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {properties.map((prop) => (
            <Marker key={prop.id} position={[prop.lat, prop.lng] as [number, number]}>
                <Popup>
                    <div className="text-center">
                        <h3 className="font-bold text-emerald-600">{prop.title}</h3>
                        <p className="font-semibold">{prop.price}</p>
                        <button className="mt-2 text-xs bg-emerald-600 text-white px-2 py-1 rounded">View</button>
                    </div>
                </Popup>
            </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
