"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { searchCities } from "@/lib/city-data";
import { CitySummary } from "@/types";

export default function CitySearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CitySummary[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(async () => {
      if (query.trim().length > 0) {
        setIsSearching(true);
        const searchResults = await searchCities(query);
        setResults(searchResults);
        setIsOpen(true);
        setIsSearching(false);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSelect = (city: CitySummary) => {
    setQuery("");
    setIsOpen(false);
    router.push(`/city/${city.id}`);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
          {isSearching ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-amber-300 border-t-amber-500 rounded-full"
            />
          ) : (
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          )}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索城市... (如：唐山、保定、天津)"
          className="w-full pl-13 pr-5 py-4 text-lg rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-lg shadow-amber-100/40 focus:bg-white/80 focus:outline-none focus:ring-2 focus:ring-amber-300/50 focus:shadow-xl transition-all"
        />
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
          >
            {results.map((city) => (
              <button
                key={city.id}
                onClick={() => handleSelect(city)}
                className="w-full px-5 py-4 text-left hover:bg-amber-50 transition-colors flex items-center gap-4"
              >
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-lg">
                  🏙️
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {city.name}
                    {city.nameLocal && (
                      <span className="text-gray-500 ml-2">
                        {city.nameLocal}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">{city.province}</div>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && query && results.length === 0 && !isSearching && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 text-center text-gray-500 z-50"
        >
          暂未找到该城市，试试 &quot;唐山&quot; 或 &quot;天津&quot;
        </motion.div>
      )}
    </div>
  );
}
