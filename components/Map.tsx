"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import Search from "@/components/Search";
import Info from "@/components/Info";
import { useState } from "react";
import type { Location } from "@/lib/types";
import { LatLngExpression, LatLngTuple } from "leaflet";

interface MapProps {
  markers: Location[];
}

export default function Map(Map: MapProps) {
  const zoom: number = 8;
  const center: LatLngExpression | LatLngTuple = [40, 0];
  const { markers } = Map;
  const [infoVisibility, setInfoVisibility] = useState<boolean>(false);
  const [location, setLocation] = useState<number | null>(null);

  const renderMarkers = () => {
    return markers.map((location) => {
      return (
        <Marker
          position={location.coordinates}
          draggable={false}
          eventHandlers={{
            click: () => {
              setInfoVisibility(true);
              setLocation(location.id);
            },
          }}
        >
          <Popup>{location.name}</Popup>
        </Marker>
      );
    });
  };

  function MapEvents() {
    useMapEvents({
      click: () => {
        setInfoVisibility(false);
        setLocation(null);
      },
    });
    return null;
  }

  return (
    <>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", zIndex: 1 }}
        zoomControl={false}
      >
        <MapEvents />
        <Search
          markers={markers}
          setInfoVisibility={setInfoVisibility}
          setLocation={setLocation}
        />
        {infoVisibility && location != null ? (
          <Info location={location} markers={markers} />
        ) : null}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {renderMarkers()}
        <ZoomControl position="bottomright" />
      </MapContainer>
    </>
  );
}
