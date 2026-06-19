"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LocationSummary } from "@/types";

interface LocationCardProps {
  location: LocationSummary;
  index: number;
}

export default function LocationCard({ location, index }: LocationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/location/${location.id}`}
        className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
      >
        {/* Image */}
        <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
          <img
            src={location.coverImage}
            alt={location.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
          {/* Country badge */}
          <div className="absolute top-3 left-3 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
            {location.country}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
            {location.name}
          </h3>
          {location.nameLocal && (
            <p className="text-sm text-gray-500 mt-0.5">
              {location.nameLocal}
            </p>
          )}
          <p className="mt-3 text-sm text-gray-600 line-clamp-2">
            {location.summary}
          </p>

          {/* CTA */}
          <div className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-600">
            <span>Explore history</span>
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
