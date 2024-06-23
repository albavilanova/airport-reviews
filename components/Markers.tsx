"use client";

import { Marker, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import type { Location } from "@/lib/types";
import { useRouter } from "next/navigation";
import { LatLngExpression, LatLngTuple } from "leaflet";

interface MarkersProps {
  markers: Location[];
  setInfoVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setLocation: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function Markers(Markers: MarkersProps) {
  const { markers, setInfoVisibility, setLocation } = Markers;
  const router = useRouter();
  const map = useMap();
  const airportIcon = new Icon({
    iconUrl: "../airport.svg",
    iconSize: [25, 55],
  });

  return markers.map((location: Location) => {
    const coordinates: LatLngExpression | LatLngTuple = [
      location.coordinates[0],
      location.coordinates[1] + 0.1,
    ];
    return (
      <Marker
        key={location.id}
        position={location.coordinates}
        draggable={false}
        eventHandlers={{
          click: () => {
            setInfoVisibility(true);
            setLocation(location.id);
            map.setView(coordinates, 12);
            router.push(`/map?location=${location.id}`);
          },
        }}
        icon={airportIcon}
      ></Marker>
    );
  });
}
