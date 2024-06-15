"use client";

import {
  MapContainer,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import Search from "@/components/Search";
import Info from "@/components/Info";
import Markers from "@/components/Markers";
import { useState } from "react";
import type { Location, Review } from "@/lib/types";
import { LatLngExpression, LatLngTuple } from "leaflet";

interface MapProps {
  markers: Location[];
  reviews: Review[]
}

export default function Map(Map: MapProps) {
  const zoom: number = 5.5;
  const center: LatLngExpression | LatLngTuple = [36.3, -8];
  const { markers, reviews } = Map;
  const [infoVisibility, setInfoVisibility] = useState<boolean>(false);
  const [location, setLocation] = useState<number | null>(null);

  return (
    <>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", zIndex: 1 }}
        zoomControl={false}
        zoomSnap={0.1}
        minZoom={zoom}
      >
        <Search
          markers={markers}
          setInfoVisibility={setInfoVisibility}
          setLocation={setLocation}
        />
        {infoVisibility && location != null ? (
          <Info
            location={location}
            markers={markers}
            reviews={reviews}
            setInfoVisibility={setInfoVisibility}
            setLocation={setLocation}
          />
        ) : null}
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        <Markers
          markers={markers}
          setInfoVisibility={setInfoVisibility}
          setLocation={setLocation}
        />
        <ZoomControl position="bottomleft" />
      </MapContainer>
    </>
  );
}
