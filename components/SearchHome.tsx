"use client";

import SelectBox from "./SelectBox";
import type { Location } from "@/lib/types";
import { useRouter } from "next/navigation";

interface SearchProps {
  markers: Location[];
}

export default function SearchHome(SearchHome: SearchProps) {
  const { markers } = SearchHome;
  const router = useRouter();
  return (
    <SelectBox
      onValueChange={(event) => {
        router.push(`/map?location=${event}`);
      }}
      markers={markers}
    />
  );
}
