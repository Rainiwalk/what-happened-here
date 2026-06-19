"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import CitySearchBar from "./CitySearchBar";
import { getAllCities } from "@/lib/city-data";
import { CitySummary } from "@/types";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<"city" | "landmark">("city");
  const [cities, setCities] = useState<CitySummary[]>([]);

  useEffect(() => {
    getAllCities().then(setCities).catch(console.error);
  }, []);

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50">
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
          <span className="inline-block px-4 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-6">
            城市时间线档案馆
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            这里发生了什么？
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            每座城市都有自己的故事。
            <br />
            用时间线了解一座城市是如何形成的。
          </p>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 flex items-center justify-center gap-2"
        >
          <button
            onClick={() => setActiveTab("city")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === "city"
                ? "bg-amber-500 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            🏙️ 城市时间线
          </button>
          <button
            onClick={() => setActiveTab("landmark")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === "landmark"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            🏛️ 世界地标
          </button>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8"
        >
          {activeTab === "city" ? <CitySearchBar /> : <SearchBar />}
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <span className="text-sm text-gray-500">
            {activeTab === "city" ? "所有城市:" : "热门地标:"}
          </span>
          {activeTab === "city" ? (
            cities.map((city) => (
              <Link
                key={city.id}
                href={`/city/${city.id}`}
                className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-colors border border-gray-200"
              >
                {city.nameLocal || city.name}
              </Link>
            ))
          ) : (
            <>
              <Link
                href="/location/tokyo-station"
                className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors border border-gray-200"
              >
                东京站
              </Link>
              <Link
                href="/location/eiffel-tower"
                className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors border border-gray-200"
              >
                埃菲尔铁塔
              </Link>
              <Link
                href="/location/forbidden-city"
                className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors border border-gray-200"
              >
                紫禁城
              </Link>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
