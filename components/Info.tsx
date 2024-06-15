import React from "react";
import { cn } from "@/lib/utils";
import { LatLngExpression, LatLngTuple } from "leaflet";

interface Location {
  id: number;
  name: string;
  coordinates: LatLngExpression | LatLngTuple;
}

interface InfoProps {
  location: number;
  markers: Location[];
}

export default function Info(Info: InfoProps) {
  const {location, markers} = Info;
  return (
    <div
      className={cn(
        "absolute z-[999] bg-white w-1/3 h-screen",
        "p-4 text-base pt-14"
      )}
    >
      {markers[location].name}
    </div>
  );
}
