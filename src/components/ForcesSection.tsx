"use client";

import { motion } from "framer-motion";
import { GeographicForce } from "@/types";

interface ForcesSectionProps {
  cityName: string;
  forces: GeographicForce[];
}

export default function ForcesSection({ cityName, forces }: ForcesSectionProps) {
  if (forces.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
            💪 地理力量
          </span>
          <h2 className="text-3xl font-bold text-gray-900">
            塑造{cityName}的力量
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            这些长期存在的地理条件，决定了城市的命运
          </p>
        </motion.div>

        {/* Force cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {forces.map((force, index) => (
            <motion.div
              key={force.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              {/* Icon and title */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{force.icon}</span>
                <h3 className="text-lg font-bold text-gray-900">
                  {force.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-4">
                {force.description}
              </p>

              {/* Impact */}
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-start gap-2">
                  <span className="text-amber-500 text-sm font-medium mt-0.5 shrink-0">
                    ↓ 影响
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {force.impact}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
