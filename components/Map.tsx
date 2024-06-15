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

interface Location {
  id: number;
  name: string;
  coordinates: LatLngExpression | LatLngTuple;
}

interface MapProps {
  center: LatLngExpression | LatLngTuple;
  zoom: number;
  markers: Location[];
}

const Map = (Map: MapProps) => {
  const { zoom, center, markers } = Map;
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
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%", zIndex: 1 }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      {renderMarkers()}
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
};

export default Map;
