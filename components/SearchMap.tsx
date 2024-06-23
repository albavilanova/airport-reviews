"use client";

import SelectBox from "./SelectBox";
import { useMap } from "react-leaflet";
import type { Location } from "@/lib/types";
import { useRouter } from "next/navigation";
import { LatLngExpression, LatLngTuple } from "leaflet";

interface SearchProps {
  markers: Location[];
  setInfoVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setLocation: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function SearchMap(SearchMap: SearchProps) {
  const { markers, setInfoVisibility, setLocation } = SearchMap;
  const router = useRouter();
  const map = useMap();

  return (
    <div className="absolute z-[1000] w-1/5 m-4">
      <SelectBox
        onValueChange={(event) => {
          const coordinates: LatLngExpression | LatLngTuple = [
            markers[parseInt(event)].coordinates[0],
            markers[parseInt(event)].coordinates[1] + 0.1,
          ];
          map.setView(coordinates, 12);
          setInfoVisibility(true);
          setLocation(parseInt(event));
          router.push(`/map?location=${event}`);
        }}
        markers={markers}
      />
    </div>
  );
}
