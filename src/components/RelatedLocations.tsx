"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getRelatedLocations } from "@/lib/data";
import { LocationSummary } from "@/types";
import LocationCard from "./LocationCard";

interface RelatedLocationsProps {
  currentId: string;
  country: string;
}

export default function RelatedLocations({
  currentId,
  country,
}: RelatedLocationsProps) {
  const [locations, setLocations] = useState<LocationSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const data = await getRelatedLocations(currentId, country);
        setLocations(data);
      } catch (error) {
        console.error("Failed to fetch related locations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelated();
  }, [currentId, country]);

  if (loading || locations.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900">
            Related Locations
          </h2>
          <p className="mt-4 text-gray-600">
            探索其他历史地标
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location, index) => (
            <LocationCard
              key={location.id}
              location={location}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
