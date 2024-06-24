"use client";

import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import SearchMap from "@/components/SearchMap";
import Info from "@/components/Info";
import Markers from "@/components/Markers";
import { useState } from "react";
import type { Location, Review } from "@/lib/types";
import { LatLngExpression, LatLngTuple } from "leaflet";
import { useSearchParams } from "next/navigation";
import { useMediaQuery } from "react-responsive";

interface MapProps {
  markers: Location[];
  reviews: Review[];
}

export default function Map(Map: MapProps) {
  const { markers, reviews } = Map;
  const searchLocation = useSearchParams().get("location");
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

  let locationId;
  let zoom;
  let center: LatLngExpression | LatLngTuple;
  let visibility;
  if (searchLocation !== null) {
    locationId = parseInt(searchLocation);
    zoom = 12;
    center = [
      markers[locationId].coordinates[0],
      markers[locationId].coordinates[1],
    ];
    if (!isMobile) {
      center[1] += 0.1;
    }
    visibility = true;
  } else {
    locationId = null;
    zoom = 5.5;
    center = [36.3, -8];
    visibility = false;
  }
  const [location, setLocation] = useState<number | null>(locationId);
  const [infoVisibility, setInfoVisibility] = useState<boolean>(visibility);

  return (
    <div className="w-[100%] flex h-screen">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{
          height: "100%",
          width: "100%",
          zIndex: 1,
        }}
        zoomControl={false}
        zoomSnap={0.1}
        minZoom={5.5}
      >
        <SearchMap
          markers={markers}
          setInfoVisibility={setInfoVisibility}
          setLocation={setLocation}
        />
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        <Markers
          markers={markers}
          setInfoVisibility={setInfoVisibility}
          setLocation={setLocation}
        />
        <ZoomControl position="bottomleft" />
      </MapContainer>
      {infoVisibility && location != null ? (
        <Info
          location={location}
          markers={markers}
          reviews={reviews}
          setInfoVisibility={setInfoVisibility}
          setLocation={setLocation}
        />
      ) : null}
    </div>
  );
}
