"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getRelatedCities } from "@/lib/city-data";
import { CitySummary } from "@/types";
import CityCard from "./CityCard";

interface RelatedCitiesProps {
  currentId: string;
  province: string;
}

export default function RelatedCities({
  currentId,
  province,
}: RelatedCitiesProps) {
  const [cities, setCities] = useState<CitySummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const data = await getRelatedCities(currentId, province);
        setCities(data);
      } catch (error) {
        console.error("Failed to fetch related cities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelated();
  }, [currentId, province]);

  if (loading || cities.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900">相关城市</h2>
          <p className="mt-4 text-gray-600">
            探索其他城市的历史故事
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city, index) => (
            <CityCard key={city.id} city={city} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
