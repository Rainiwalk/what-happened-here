"use client";

import { motion } from "framer-motion";
import { TimelineEvent as TimelineEventType } from "@/types";

interface TimelineEventProps {
  event: TimelineEventType;
  index: number;
  isLeft: boolean;
}

export default function TimelineEvent({
  event,
  index,
  isLeft,
}: TimelineEventProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex items-start ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Timeline dot */}
      <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-sm transform -translate-x-1/2 z-10" />

      {/* Content */}
      <div
        className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
          isLeft ? "md:pr-8 md:text-right" : "md:pl-8"
        }`}
      >
        <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow">
          {/* Year */}
          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold mb-3">
            {event.year}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {event.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {event.description}
          </p>

          {/* Image if exists */}
          {event.image && (
            <div className="mt-4 rounded-lg overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
