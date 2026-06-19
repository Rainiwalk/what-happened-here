"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HistoricalImage } from "@/types";

interface ImageGalleryProps {
  images: HistoricalImage[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrevious = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(
      selectedIndex === 0 ? images.length - 1 : selectedIndex - 1
    );
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(
      selectedIndex === images.length - 1 ? 0 : selectedIndex + 1
    );
  };

  const handleClose = () => {
    setSelectedIndex(null);
  };

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
            Historical Photos
          </h2>
          <p className="mt-4 text-gray-600">
            点击图片查看大图
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={image.url}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedIndex(index)}
              className="cursor-pointer group"
            >
              <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden">
                {/* Real image */}
                <img
                  src={image.url}
                  alt={image.caption || `Historical photo from ${image.year}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Year badge */}
                <div className="absolute top-3 left-3 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {image.year}
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Caption */}
              {image.caption && (
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {image.caption}
                </p>
              )}
              <p className="text-xs text-gray-400 mt-1">{image.year}</p>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={handleClose}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Navigation */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                className="absolute left-4 text-white hover:text-gray-300 transition-colors z-50"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 text-white hover:text-gray-300 transition-colors z-50"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Image */}
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative max-w-4xl max-h-[80vh] bg-gray-800 rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={images[selectedIndex].url}
                  alt={images[selectedIndex].caption || `Historical photo from ${images[selectedIndex].year}`}
                  className="w-full h-full object-contain max-h-[80vh]"
                />

                {/* Caption overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <span className="text-xl font-bold text-white">
                    {images[selectedIndex].year}
                  </span>
                  {images[selectedIndex].caption && (
                    <p className="mt-2 text-white/80">
                      {images[selectedIndex].caption}
                    </p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
