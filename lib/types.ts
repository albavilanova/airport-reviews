import { LatLngExpression, LatLngTuple } from "leaflet";

export type Location = {
  id: number;
  type: string;
  name: string;
  coordinates: LatLngExpression | LatLngTuple;
  src: string;
};

export type Review = {
  id: number;
  locationId: number;
  rating: number;
  comment: string;
  date: string;
  firstName: string;
  lastName: string;
  images: string[];
}