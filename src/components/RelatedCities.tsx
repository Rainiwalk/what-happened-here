"use client";

import { motion } from "framer-motion";
import { CitySummary } from "@/types";
import CityCard from "./CityCard";

interface RelatedCitiesProps {
  currentId: string;
  province: string;
  cities: CitySummary[];
}

export default function RelatedCities({
  currentId,
  province,
  cities,
}: RelatedCitiesProps) {
  if (cities.length === 0) {
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
