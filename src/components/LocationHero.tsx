"use client";

import { motion } from "framer-motion";
import { Location } from "@/types";

interface LocationHeroProps {
  location: Location;
}

export default function LocationHero({ location }: LocationHeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={location.coverImage}
          alt={location.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-white/30 z-10" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <a href="/" className="hover:text-gray-700 transition-colors">
              Home
            </a>
            <span>/</span>
            <span className="text-gray-900">{location.name}</span>
          </div>

          {/* Country badge */}
          <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            {location.country}
          </span>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
            {location.name}
          </h1>
          {location.nameLocal && (
            <p className="mt-2 text-xl text-gray-500">
              {location.nameLocal}
            </p>
          )}

          {/* Summary */}
          <p className="mt-6 text-lg text-gray-600 max-w-3xl">
            {location.summary}
          </p>

          {/* Meta */}
          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-gray-500">
            {location.city && (
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{location.city}, {location.country}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                {location.timeline.length} historical events
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>
                {location.images.length} historical photos
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
