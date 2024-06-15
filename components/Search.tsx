"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LatLngExpression, LatLngTuple } from "leaflet";
import { useMap } from "react-leaflet";

interface Location {
  id: number;
  name: string;
  coordinates: LatLngExpression | LatLngTuple;
}

interface SearchProps {
  markers: Location[];
}

export default function Search(Search: SearchProps) {
  const { markers } = Search;
  const renderOptions = () => {
    return markers.map((location) => {
      return (
        <SelectItem value={location.id.toString()}>{location.name}</SelectItem>
      );
    });
  };
  const map = useMap();

  return (
    <div className="absolute inset-0 z-[1000] w-1/3 h-20">
      <Select
        onValueChange={(event) => {
          console.log("select-value", typeof event);
          map.setView(markers[parseInt(event) - 1].coordinates, 12);
        }}
      >
        <SelectTrigger className="w-[160px] m-2">
          <SelectValue placeholder="Select location" />
        </SelectTrigger>
        <SelectContent>{renderOptions()}</SelectContent>
      </Select>
    </div>
  );
}
