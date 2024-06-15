"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import Search from "@/components/Search";

interface Location {
  id: number;
  name: string;
  coordinates: LatLngExpression | LatLngTuple;
}

interface MapProps {
  markers: Location[];
}

const Map = (Map: MapProps) => {
  const zoom: number = 8;
  const center: LatLngExpression | LatLngTuple = [40, 0];
  const { markers } = Map;
  const renderMarkers = () => {
    return markers.map((location) => {
      return (
        <Marker position={location.coordinates} draggable={false}>
          <Popup>{location.name}</Popup>
        </Marker>
      );
    });
  };

  return (
    <>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", zIndex: 1 }}
        zoomControl={false}
      >
        <Search markers={markers} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {renderMarkers()}
        <ZoomControl position="bottomright" />
      </MapContainer>
    </>
  );
};

export default Map;
