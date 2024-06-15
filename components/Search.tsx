"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LatLngExpression, LatLngTuple } from "leaflet";

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

  return (
    <Select>
      <SelectTrigger className="w-[160px] m-2">
        <SelectValue placeholder="Select location" />
      </SelectTrigger>
      <SelectContent>
        {renderOptions()}
      </SelectContent>
    </Select>
  );
}
