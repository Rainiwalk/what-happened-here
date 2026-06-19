import { notFound } from "next/navigation";
import { getCityByIdSync, getAllCityIds, getAdjacentCities, getRoutesForCity, getForcesForCity } from "@/lib/server-city-data";
import CityHero from "@/components/CityHero";
import ForcesSection from "@/components/ForcesSection";
import CityTimeline from "@/components/CityTimeline";
import MapView from "@/components/MapView";
import HistoricalRoutes from "@/components/HistoricalRoutes";
import RelatedCities from "@/components/RelatedCities";
import CityNavigation from "@/components/CityNavigation";

// Generate static params for all cities
export function generateStaticParams() {
  const ids = getAllCityIds();
  return ids.map((id) => ({
    id,
  }));
}

interface CityPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CityPage({ params }: CityPageProps) {
  const { id } = await params;

  let city;
  try {
    city = getCityByIdSync(id);
  } catch {
    notFound();
  }

  const { prev, next } = getAdjacentCities(id);
  const routes = getRoutesForCity(id);
  const forces = getForcesForCity(id);

  return (
    <>
      <CityHero city={city} />
      <ForcesSection cityName={city.nameLocal || city.name} forces={forces} />
      <CityTimeline events={city.timeline} />
      <MapView lat={city.lat} lng={city.lng} name={city.name} />
      <HistoricalRoutes currentCityId={id} routes={routes} />
      <RelatedCities currentId={city.id} province={city.province} />
      <CityNavigation prev={prev} next={next} />
    </>
  );
}
