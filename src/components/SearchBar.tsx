"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { searchLocations } from "@/lib/data";
import { LocationSummary } from "@/types";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LocationSummary[]>([]);
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
        const searchResults = await searchLocations(query);
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

  const handleSelect = (location: LocationSummary) => {
    setQuery("");
    setIsOpen(false);
    router.push(`/location/${location.id}`);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a location... (e.g., Tokyo, Eiffel Tower)"
          className="w-full px-5 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all shadow-sm"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
          {isSearching ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full"
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
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
          >
            {results.map((location) => (
              <button
                key={location.id}
                onClick={() => handleSelect(location)}
                className="w-full px-5 py-4 text-left hover:bg-gray-50 transition-colors flex items-center gap-4"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                  📍
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {location.name}
                    {location.nameLocal && (
                      <span className="text-gray-500 ml-2">
                        {location.nameLocal}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {location.city && `${location.city}, `}
                    {location.country}
                  </div>
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
          No locations found. Try &quot;Tokyo&quot; or &quot;Eiffel Tower&quot;.
        </motion.div>
      )}
    </div>
  );
}
