import { LatLngExpression, LatLngTuple } from "leaflet";

export type Location = {
  id: number;
  type: string;
  name: string;
  coordinates: LatLngExpression | LatLngTuple;
};
