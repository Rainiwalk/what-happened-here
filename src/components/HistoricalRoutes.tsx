"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Route, CitySummary } from "@/types";
import { getPath } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getAllCities } from "@/lib/city-data";

interface HistoricalRoutesProps {
  currentCityId: string;
  routes: Route[];
}

export default function HistoricalRoutes({
  currentCityId,
  routes,
}: HistoricalRoutesProps) {
  const [cities, setCities] = useState<CitySummary[]>([]);

  useEffect(() => {
    getAllCities().then(setCities).catch(console.error);
  }, []);

  if (routes.length === 0) return null;

  const getCityInfo = (cityId: string) =>
    cities.find((c) => c.id === cityId);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-amber-50">
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
            🗺️ 历史通道
          </span>
          <h2 className="text-3xl font-bold text-gray-900">
            这座城市所在的历史通道
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            城市并非孤立发展，很多城市的兴衰都来自同一条历史通道
          </p>
        </motion.div>

        {/* Route cards */}
        <div className="space-y-8">
          {routes.map((route, routeIndex) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: routeIndex * 0.1 }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              {/* Route header */}
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl">{route.icon}</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {route.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                    {route.description}
                  </p>
                </div>
              </div>

              {/* Route path visualization */}
              <div className="mt-6">
                {/* Desktop: horizontal layout */}
                <div className="hidden sm:flex items-center justify-center gap-0 overflow-x-auto py-2">
                  {route.cities.map((cityId, index) => {
                    const cityInfo = getCityInfo(cityId);
                    const isCurrent = cityId === currentCityId;
                    const isLast = index === route.cities.length - 1;

                    return (
                      <div key={cityId} className="flex items-center">
                        {/* City node */}
                        {isCurrent ? (
                          <div className="flex flex-col items-center">
                            <div className="relative">
                              <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-amber-500 shadow-lg ring-4 ring-amber-200">
                                {cityInfo?.coverImage ? (
                                  <img
                                    src={getPath(cityInfo.coverImage)}
                                    alt={cityInfo.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-amber-100 flex items-center justify-center text-lg font-bold text-amber-700">
                                    {(cityInfo?.nameLocal || cityInfo?.name || cityId)[0]}
                                  </div>
                                )}
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            </div>
                            <span className="mt-2 text-sm font-bold text-amber-700">
                              {cityInfo?.nameLocal || cityInfo?.name || cityId}
                            </span>
                            <span className="text-xs text-amber-500">当前城市</span>
                          </div>
                        ) : (
                          <Link href={`/city/${cityId}`} className="group flex flex-col items-center">
                            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-amber-400 transition-colors">
                              {cityInfo?.coverImage ? (
                                <img
                                  src={getPath(cityInfo.coverImage)}
                                  alt={cityInfo.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-500 group-hover:bg-amber-50 transition-colors">
                                  {(cityInfo?.nameLocal || cityInfo?.name || cityId)[0]}
                                </div>
                              )}
                            </div>
                            <span className="mt-2 text-sm font-medium text-gray-700 group-hover:text-amber-600 transition-colors">
                              {cityInfo?.nameLocal || cityInfo?.name || cityId}
                            </span>
                          </Link>
                        )}

                        {/* Arrow connector */}
                        {!isLast && (
                          <div className="flex items-center mx-2 sm:mx-3">
                            <div className="w-6 sm:w-10 h-0.5 bg-gray-300" />
                            <svg className="w-4 h-4 text-gray-400 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Mobile: vertical layout */}
                <div className="sm:hidden flex flex-col items-center gap-0">
                  {route.cities.map((cityId, index) => {
                    const cityInfo = getCityInfo(cityId);
                    const isCurrent = cityId === currentCityId;
                    const isLast = index === route.cities.length - 1;

                    return (
                      <div key={cityId} className="flex flex-col items-center">
                        {/* City node */}
                        {isCurrent ? (
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="w-14 h-14 rounded-full overflow-hidden border-3 border-amber-500 shadow-lg ring-4 ring-amber-200">
                                {cityInfo?.coverImage ? (
                                  <img
                                    src={getPath(cityInfo.coverImage)}
                                    alt={cityInfo.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-amber-100 flex items-center justify-center text-lg font-bold text-amber-700">
                                    {(cityInfo?.nameLocal || cityInfo?.name || cityId)[0]}
                                  </div>
                                )}
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
                                <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            </div>
                            <div>
                              <span className="text-sm font-bold text-amber-700">
                                {cityInfo?.nameLocal || cityInfo?.name || cityId}
                              </span>
                              <span className="block text-xs text-amber-500">当前城市</span>
                            </div>
                          </div>
                        ) : (
                          <Link href={`/city/${cityId}`} className="group flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-amber-400 transition-colors">
                              {cityInfo?.coverImage ? (
                                <img
                                  src={getPath(cityInfo.coverImage)}
                                  alt={cityInfo.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-500 group-hover:bg-amber-50 transition-colors">
                                  {(cityInfo?.nameLocal || cityInfo?.name || cityId)[0]}
                                </div>
                              )}
                            </div>
                            <span className="text-sm font-medium text-gray-700 group-hover:text-amber-600 transition-colors">
                              {cityInfo?.nameLocal || cityInfo?.name || cityId}
                            </span>
                          </Link>
                        )}

                        {/* Vertical arrow */}
                        {!isLast && (
                          <div className="flex flex-col items-center my-1">
                            <div className="w-0.5 h-4 bg-gray-300" />
                            <svg className="w-3 h-3 text-gray-400 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
