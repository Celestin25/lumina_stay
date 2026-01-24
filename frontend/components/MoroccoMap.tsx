
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix for Leaflet icons in Next.js
const iconUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png";
const iconRetinaUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png";
const shadowUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

interface Property {
    City: str;
    Neighborhood: str;
    Price_MAD: number;
    Latitude: number;
    Longitude: number;
    Property_Type: str;
}

interface MapProps {
    properties: Property[];
}

export default function MoroccoMap({ properties }: MapProps) {
    // Center on Morocco (approx)
    const position: [number, number] = [31.7917, -7.0926];

    return (
        <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-2xl border border-gray-200">
            <MapContainer center={position} zoom={6} scrollWheelZoom={false} className="h-full w-full">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {properties.map((prop, idx) => (
                    <Marker key={idx} position={[prop.Latitude, prop.Longitude]} icon={customIcon}>
                        <Popup>
                            <div className="text-sm">
                                <h3 className="font-bold">{prop.Property_Type} in {prop.City}</h3>
                                <p>{prop.Neighborhood}</p>
                                <p className="text-emerald-600 font-bold">{prop.Price_MAD.toLocaleString()} MAD</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
