"use client";

import { motion } from "framer-motion";
import { TimelineEvent as TimelineEventType } from "@/types";
import TimelineEvent from "./TimelineEvent";

interface TimelineProps {
  events: TimelineEventType[];
}

export default function Timeline({ events }: TimelineProps) {
  // Sort events by year
  const sortedEvents = [...events].sort(
    (a, b) => parseInt(a.year) - parseInt(b.year)
  );

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900">
            Historical Timeline
          </h2>
          <p className="mt-4 text-gray-600">
            滚动查看这个地点的历史事件
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2" />

          {/* Events */}
          <div className="space-y-12">
            {sortedEvents.map((event, index) => (
              <TimelineEvent
                key={event.year}
                event={event}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
