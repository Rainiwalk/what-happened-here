"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import CitySearchBar from "./CitySearchBar";
import { CitySummary } from "@/types";

interface HeroSectionProps {
  cities: CitySummary[];
}

export default function HeroSection({ cities }: HeroSectionProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50 pt-20 pb-16">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            5分钟，了解一座城
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto space-y-3">
            <span className="block">来到一座陌生城市，</span>
            <span className="block">为什么这里叫这个名字？</span>
            <span className="block">这座城市经历了什么才变成今天这样？</span>
            <span className="block text-amber-600 font-medium">用5分钟时间线，看懂一座城市的前世今生。</span>
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8"
        >
          <CitySearchBar />
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <span className="text-sm text-gray-500">快速体验:</span>
          {cities.map((city) => (
            <Link
              key={city.id}
              href={`/city/${city.id}`}
              className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-colors border border-gray-200"
            >
              {city.nameLocal || city.name}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
