import dynamic from "next/dynamic";
import { useMemo } from "react";
import { promises as fs } from 'fs';
import type { Location } from "@/lib/types";

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
        <Map markers={markers} />
      </div>
    </main>
  );
}
