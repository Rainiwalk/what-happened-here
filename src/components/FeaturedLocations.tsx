"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAllLocations } from "@/lib/data";
import { LocationSummary } from "@/types";
import LocationCard from "./LocationCard";

export default function FeaturedLocations() {
  const [locations, setLocations] = useState<LocationSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getAllLocations();
        setLocations(data);
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return (
    <section id="featured" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900">
            Featured Locations
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            探索世界各地的历史地标，了解它们背后的故事
          </p>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl h-80 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location, index) => (
              <LocationCard
                key={location.id}
                location={location}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
