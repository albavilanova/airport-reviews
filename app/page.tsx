import dynamic from "next/dynamic";
import { useMemo } from "react";
import { promises as fs } from 'fs';
import type { Location, Review } from "@/lib/types";

export default async function Home() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  const locationsFile = await fs.readFile(process.cwd() + '/lib/locations.json', 'utf8');
  const markers: Location[] = JSON.parse(locationsFile);
  const reviewsFile = await fs.readFile(process.cwd() + '/lib/reviews.json', 'utf8');
  const reviews: Review[] = JSON.parse(reviewsFile);
  
  return (
    <main>
      <Map markers={markers} reviews={reviews} />
    </main>
  );
}
