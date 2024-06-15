import dynamic from "next/dynamic";
import { useMemo } from "react";
import { promises as fs } from 'fs';
import Search from "@/components/Search";
import { LatLngExpression, LatLngTuple } from "leaflet";

interface Location {
  id: number;
  name: string;
  coordinates: LatLngExpression | LatLngTuple;
}

export default async function Home() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  const file = await fs.readFile(process.cwd() + '/lib/locations.json', 'utf8');
  const markers: Location[] = JSON.parse(file);

  return (
    <main>
      <div className="w-[100%] h-screen">
        <Map zoom={8} center={[40, 0]} markers={markers} />
        <div className="absolute inset-0 z-10 w-1/3 h-20">
          <Search markers={markers}/>
          {/* <h2 className="m-2 text-xl font-medium bg-white">Reviews</h2> */}
        </div>
      </div>
    </main>
  );
}
