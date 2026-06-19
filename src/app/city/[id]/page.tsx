import { notFound } from "next/navigation";
import { getCityByIdSync, getAllCityIds } from "@/lib/server-city-data";
import CityHero from "@/components/CityHero";
import CityTimeline from "@/components/CityTimeline";
import MapView from "@/components/MapView";
import RelatedCities from "@/components/RelatedCities";

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

  return (
    <>
      <CityHero city={city} />
      <CityTimeline events={city.timeline} />
      <MapView lat={city.lat} lng={city.lng} name={city.name} />
      <RelatedCities currentId={city.id} province={city.province} />
    </>
  );
}
