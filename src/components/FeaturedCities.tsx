"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CitySummary } from "@/types";
import CityCard from "./CityCard";

interface FeaturedCitiesProps {
  cities: CitySummary[];
}

export default function FeaturedCities({ cities }: FeaturedCitiesProps) {
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
            🏙️ 精选城市
          </span>
          <h2 className="text-3xl font-bold text-gray-900">
            探索城市的历史脉络
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            每座城市都有自己的故事。用时间线了解一座城市是如何形成的。
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city, index) => (
            <CityCard key={city.id} city={city} index={index} />
          ))}
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="/cities"
            className="inline-flex items-center gap-2 px-8 py-3 bg-amber-500 text-white rounded-full font-medium hover:bg-amber-600 transition-colors shadow-lg shadow-amber-200"
          >
            查看全部城市
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
