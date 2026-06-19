"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface MapViewProps {
  lat: number;
  lng: number;
  name: string;
}

export default function MapView({ lat, lng, name }: MapViewProps) {
  const [MapComponent, setMapComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    // Dynamically import react-leaflet to avoid SSR issues
    const loadMap = async () => {
      const L = await import("leaflet");
      const { MapContainer, TileLayer, Marker, Popup } = await import("react-leaflet");

      // Fix default marker icon
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const MapInner = () => (
        <MapContainer
          center={[lat, lng]}
          zoom={14}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lng]}>
            <Popup>
              <strong>{name}</strong>
            </Popup>
          </Marker>
        </MapContainer>
      );

      setMapComponent(() => MapInner);
    };

    loadMap();
  }, [lat, lng, name]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900">Location</h2>
          <p className="mt-4 text-gray-600">
            查看{name}在地图上的位置
          </p>
        </motion.div>

        {/* Map container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200"
        >
          <div className="w-full h-[400px]">
            {MapComponent ? (
              <MapComponent />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-6xl">🗺️</span>
                  <p className="mt-4 text-gray-500">Loading map...</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Coordinates */}
        <div className="mt-4 text-center text-sm text-gray-500">
          <span>Coordinates: {lat.toFixed(6)}, {lng.toFixed(6)}</span>
        </div>
      </div>
    </section>
  );
}
