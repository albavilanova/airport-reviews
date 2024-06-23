"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Location } from "@/lib/types";

interface SelectBoxProps {
  onValueChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  markers: Location[];
}

export default function SelectBox(SelectBox: SelectBoxProps) {
  const { onValueChange, markers } = SelectBox;
  console.log(typeof(onValueChange));
  const renderOptions = () => {
    return markers.map((location: Location) => {
      return (
        <SelectItem key={location.id.toString()} value={location.id.toString()}>
          {location.name}
        </SelectItem>
      );
    });
  };

  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select airport" />
      </SelectTrigger>
      <SelectContent>{renderOptions()}</SelectContent>
    </Select>
  );
}
