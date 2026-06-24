"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { CitySummary } from "@/types";
import CityCard from "./CityCard";

interface CitiesPageContentProps {
  groupedCities: Record<string, CitySummary[]>;
  sortedProvinces: string[];
}

export default function CitiesPageContent({
  groupedCities,
  sortedProvinces,
}: CitiesPageContentProps) {
  const [query, setQuery] = useState("");

  // 搜索过滤
  const filtered = useMemo(() => {
    if (!query.trim()) return null; // null 表示不筛选，显示全部

    const q = query.trim().toLowerCase();
    const result: Record<string, CitySummary[]> = {};

    for (const province of sortedProvinces) {
      const matched = groupedCities[province].filter(
        (city) =>
          city.name.toLowerCase().includes(q) ||
          (city.nameLocal && city.nameLocal.includes(q)) ||
          city.province.includes(q) ||
          city.summary.includes(q)
      );
      if (matched.length > 0) {
        result[province] = matched;
      }
    }

    return result;
  }, [query, groupedCities, sortedProvinces]);

  const displayGrouped = filtered ?? groupedCities;
  const displayProvinces = filtered
    ? Object.keys(filtered).sort()
    : sortedProvinces;

  const totalFiltered = displayProvinces.reduce(
    (sum, p) => sum + displayGrouped[p].length,
    0
  );

  let cardIndex = 0;

  return (
    <>
      {/* Search bar */}
      <div className="max-w-xl mx-auto mb-12">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索城市名称、省份或关键词..."
            className="w-full px-5 py-3 rounded-full border-2 border-amber-200 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all shadow-sm text-gray-900"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        {query.trim() && (
          <p className="mt-3 text-sm text-gray-500 text-center">
            找到 <span className="text-amber-600 font-medium">{totalFiltered}</span> 座城市
          </p>
        )}
      </div>

      {/* No results */}
      {totalFiltered === 0 && (
        <div className="text-center py-20 text-gray-500">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-lg">未找到匹配的城市，试试其他关键词</p>
        </div>
      )}

      {/* Grouped cities */}
      {displayProvinces.map((province) => (
        <motion.div
          key={province}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 text-sm">
              📍
            </span>
            {province}
            <span className="text-sm font-normal text-gray-400">
              ({displayGrouped[province].length} 座)
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayGrouped[province].map((city) => (
              <CityCard key={city.id} city={city} index={cardIndex++} />
            ))}
          </div>
        </motion.div>
      ))}
    </>
  );
}
