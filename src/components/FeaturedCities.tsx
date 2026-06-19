"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAllCities } from "@/lib/city-data";
import { CitySummary } from "@/types";
import CityCard from "./CityCard";

export default function FeaturedCities() {
  const [cities, setCities] = useState<CitySummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await getAllCities();
        setCities(data);
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  return (
    <section id="cities" className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
            🏙️ 城市时间线
          </span>
          <h2 className="text-3xl font-bold text-gray-900">
            探索城市的历史脉络
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            每座城市都有自己的故事。用时间线了解一座城市是如何形成的。
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
            {cities.map((city, index) => (
              <CityCard key={city.id} city={city} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
