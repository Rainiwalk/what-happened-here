"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CityTimelineEvent, Era } from "@/types";

interface CityTimelineProps {
  events: CityTimelineEvent[];
}

const eraLabels: Record<Era, { label: string; color: string; bgColor: string }> = {
  ancient: { label: "古代", color: "text-amber-700", bgColor: "bg-amber-100" },
  modern: { label: "近代", color: "text-blue-700", bgColor: "bg-blue-100" },
  contemporary: { label: "现代", color: "text-green-700", bgColor: "bg-green-100" },
};

export default function CityTimeline({ events }: CityTimelineProps) {
  const [activeEra, setActiveEra] = useState<Era | "all">("all");

  // Sort events by year
  const sortedEvents = [...events].sort(
    (a, b) => parseInt(a.year) - parseInt(b.year)
  );

  // Filter by era
  const filteredEvents =
    activeEra === "all"
      ? sortedEvents
      : sortedEvents.filter((e) => e.era === activeEra);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900">城市时间线</h2>
          <p className="mt-4 text-gray-600">
            滚动浏览这座城市的历史脉络
          </p>
        </motion.div>

        {/* Era filter tabs */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveEra("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeEra === "all"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            全部 ({events.length})
          </button>
          {(["ancient", "modern", "contemporary"] as Era[]).map((era) => {
            const count = events.filter((e) => e.era === era).length;
            return (
              <button
                key={era}
                onClick={() => setActiveEra(era)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeEra === era
                    ? `${eraLabels[era].bgColor} ${eraLabels[era].color}`
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {eraLabels[era].label} ({count})
              </button>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2" />

          {/* Events */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeEra}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {filteredEvents.map((event, index) => {
                const isLeft = index % 2 === 0;
                const eraInfo = eraLabels[event.era];

                return (
                  <motion.div
                    key={`${event.year}-${event.title}`}
                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className={`relative flex items-start ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Timeline dot */}
                    <div
                      className={`absolute left-8 md:left-1/2 w-4 h-4 rounded-full border-4 border-white shadow-sm transform -translate-x-1/2 z-10 ${
                        event.era === "ancient"
                          ? "bg-amber-500"
                          : event.era === "modern"
                          ? "bg-blue-500"
                          : "bg-green-500"
                      }`}
                    />

                    {/* Content */}
                    <div
                      className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                        isLeft ? "md:pr-8 md:text-right" : "md:pl-8"
                      }`}
                    >
                      <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow">
                        {/* Year and era badge */}
                        <div className={`flex items-center gap-3 mb-3 ${isLeft ? "md:justify-end" : ""}`}>
                          <span className="text-lg font-bold text-gray-900">
                            {event.year}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${eraInfo.bgColor} ${eraInfo.color}`}
                          >
                            {eraInfo.label}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {event.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              该时期暂无记录
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
