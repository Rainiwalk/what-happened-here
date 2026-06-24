import HeroSection from "@/components/HeroSection";
import FeaturedCities from "@/components/FeaturedCities";
import { getFeaturedCitiesSync } from "@/lib/server-city-data";

export default function Home() {
  const featuredCities = getFeaturedCitiesSync();

  return (
    <>
      <HeroSection cities={featuredCities} />
      <FeaturedCities cities={featuredCities} />
    </>
  );
}
