import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/WhatHappenedHere",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
