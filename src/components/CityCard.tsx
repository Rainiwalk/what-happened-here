"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CitySummary } from "@/types";

interface CityCardProps {
  city: CitySummary;
  index: number;
}

export default function CityCard({ city, index }: CityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/city/${city.id}`}
        className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
      >
        {/* Image */}
        <div className="relative h-48 bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden">
          <img
            src={city.coverImage}
            alt={city.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
          {/* Province badge */}
          <div className="absolute top-3 left-3 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
            {city.province}
          </div>
          {/* Timeline count badge */}
          <div className="absolute bottom-3 right-3 z-20 bg-amber-500/90 text-white px-3 py-1 rounded-full text-xs font-medium">
            30 个时间节点
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-amber-600 transition-colors">
            {city.name}
          </h3>
          {city.nameLocal && (
            <p className="text-sm text-gray-500 mt-0.5">
              {city.nameLocal}
            </p>
          )}
          <p className="mt-3 text-sm text-gray-600 line-clamp-2">
            {city.summary}
          </p>

          {/* CTA */}
          <div className="mt-4 flex items-center gap-2 text-sm font-medium text-amber-600">
            <span>探索城市历史</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
