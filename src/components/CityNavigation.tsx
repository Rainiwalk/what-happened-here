"use client";

import Link from "next/link";

interface CityInfo {
  id: string;
  name: string;
  nameLocal: string;
}

interface CityNavigationProps {
  prev: CityInfo | null;
  next: CityInfo | null;
}

export default function CityNavigation({ prev, next }: CityNavigationProps) {
  return (
    <>
      {/* Left trigger zone + navigation */}
      {prev && (
        <div className="fixed left-0 bottom-0 z-40 hidden md:block group/left">
          {/* Invisible trigger zone */}
          <div className="w-32 h-48 cursor-pointer" />
          {/* Navigation button - shows on hover */}
          <Link href={`/city/${prev.id}`}>
            <div className="absolute left-0 bottom-0 opacity-0 group-hover/left:opacity-100 transition-opacity duration-300 pointer-events-none group-hover/left:pointer-events-auto">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-tr-xl shadow-lg border border-l-0 border-b-0 border-gray-200 hover:bg-amber-50 hover:border-amber-300 transition-all duration-300 cursor-pointer">
                <svg
                  className="w-5 h-5 text-gray-600"
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
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">上一座城市</span>
                  <span className="text-sm font-medium text-gray-700">
                    {prev.nameLocal || prev.name}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Right trigger zone + navigation */}
      {next && (
        <div className="fixed right-0 bottom-0 z-40 hidden md:block group/right">
          {/* Invisible trigger zone */}
          <div className="w-32 h-48 cursor-pointer" />
          {/* Navigation button - shows on hover */}
          <Link href={`/city/${next.id}`}>
            <div className="absolute right-0 bottom-0 opacity-0 group-hover/right:opacity-100 transition-opacity duration-300 pointer-events-none group-hover/right:pointer-events-auto">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-tl-xl shadow-lg border border-r-0 border-b-0 border-gray-200 hover:bg-amber-50 hover:border-amber-300 transition-all duration-300 cursor-pointer">
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-400">下一座城市</span>
                  <span className="text-sm font-medium text-gray-700">
                    {next.nameLocal || next.name}
                  </span>
                </div>
                <svg
                  className="w-5 h-5 text-gray-600"
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
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  );
}
