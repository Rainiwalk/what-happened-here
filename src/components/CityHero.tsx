"use client";

import { motion } from "framer-motion";
import { City } from "@/types";

interface CityHeroProps {
  city: City;
}

export default function CityHero({ city }: CityHeroProps) {
  // 统计各时代事件数量
  const ancientCount = city.timeline.filter(e => e.era === "ancient").length;
  const modernCount = city.timeline.filter(e => e.era === "modern").length;
  const contemporaryCount = city.timeline.filter(e => e.era === "contemporary").length;

  return (
    <section className="relative min-h-[70vh] flex items-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <div className="absolute inset-0 flex items-center justify-center text-[300px] opacity-10">
          🏙️
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent z-10" />
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
              首页
            </a>
            <span>/</span>
            <span className="hover:text-gray-700 transition-colors cursor-pointer">
              城市时间线
            </span>
            <span>/</span>
            <span className="text-gray-900">{city.name}</span>
          </div>

          {/* Province badge */}
          <span className="inline-block px-4 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
            {city.province}
          </span>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
            {city.name}
            {city.nameLocal && (
              <span className="ml-4 text-3xl sm:text-4xl lg:text-5xl text-gray-500">
                {city.nameLocal}
              </span>
            )}
          </h1>

          {/* Summary */}
          <p className="mt-6 text-lg text-gray-600 max-w-3xl">
            {city.summary}
          </p>

          {/* Era stats */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full">
              <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
              <span className="text-sm font-medium text-amber-800">古代 {ancientCount} 个节点</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              <span className="text-sm font-medium text-blue-800">近代 {modernCount} 个节点</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="text-sm font-medium text-green-800">现代 {contemporaryCount} 个节点</span>
            </div>
          </div>

          {/* Meta info */}
          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{city.lat.toFixed(4)}, {city.lng.toFixed(4)}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{city.timeline.length} 个历史节点</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
