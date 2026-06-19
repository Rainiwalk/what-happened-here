import HeroSection from "@/components/HeroSection";
import FeaturedCities from "@/components/FeaturedCities";
import { getAllCitiesSync } from "@/lib/server-city-data";

export default function Home() {
  const cities = getAllCitiesSync();

  return (
    <>
      <HeroSection cities={cities} />
      <FeaturedCities cities={cities} />
    </>
  );
}
