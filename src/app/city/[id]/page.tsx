import { notFound } from "next/navigation";
import { getCityByIdSync, getAllCityIds, getAllCitiesSync, getAdjacentCities, getRoutesForCity, getForcesForCity, getRelatedCitiesSync } from "@/lib/server-city-data";
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
  const allCities = getAllCitiesSync();
  const relatedCities = getRelatedCitiesSync(id, city.province, city.relatedCities);

  // 只传递路线中涉及的城市，而非全部30个
  const routeCityIds = new Set(routes.flatMap((r) => r.cities));
  const routeCities = allCities.filter((c) => routeCityIds.has(c.id));

  return (
    <>
      <CityHero city={city} />
      <ForcesSection cityName={city.nameLocal || city.name} forces={forces} />
      <CityTimeline events={city.timeline} />
      <MapView lat={city.lat} lng={city.lng} name={city.name} />
      <HistoricalRoutes currentCityId={id} routes={routes} allCities={routeCities} />
      <RelatedCities currentId={city.id} province={city.province} cities={relatedCities} />
      <CityNavigation prev={prev} next={next} />
    </>
  );
}
