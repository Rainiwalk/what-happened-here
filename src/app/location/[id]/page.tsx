import { notFound } from "next/navigation";
import { getLocationByIdSync, getAllLocationIds } from "@/lib/server-data";
import LocationHero from "@/components/LocationHero";
import Timeline from "@/components/Timeline";
import ImageGallery from "@/components/ImageGallery";
import MapView from "@/components/MapView";
import RelatedLocations from "@/components/RelatedLocations";

// Generate static params for all locations
export function generateStaticParams() {
  const ids = getAllLocationIds();
  return ids.map((id) => ({
    id,
  }));
}

interface LocationPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { id } = await params;

  let location;
  try {
    location = getLocationByIdSync(id);
  } catch {
    notFound();
  }

  return (
    <>
      <LocationHero location={location} />
      <Timeline events={location.timeline} />
      <ImageGallery images={location.images} />
      <MapView lat={location.lat} lng={location.lng} name={location.name} />
      <RelatedLocations currentId={location.id} country={location.country} />
    </>
  );
}
