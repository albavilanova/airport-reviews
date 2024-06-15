"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMap } from "react-leaflet";
import type { Location } from "@/lib/types";

interface SearchProps {
  markers: Location[];
  setInfoVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setLocation: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function Search(Search: SearchProps) {
  const { markers, setInfoVisibility, setLocation } = Search;
  const renderOptions = () => {
    return markers.map((location: Location) => {
      return (
        <SelectItem key={location.id.toString()} value={location.id.toString()}>
          {location.name}
        </SelectItem>
      );
    });
  };
  const map = useMap();

  return (
    <div className="absolute z-[1000] w-1/5 h-20 m-4">
      <Select
        onValueChange={(event) => {
          map.setView(markers[parseInt(event)].coordinates, 12);
          setInfoVisibility(true);
          setLocation(parseInt(event));
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select airport" />
        </SelectTrigger>
        <SelectContent>{renderOptions()}</SelectContent>
      </Select>
    </div>
  );
}
