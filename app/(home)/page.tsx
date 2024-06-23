import { promises as fs } from "fs";
import Link from "next/link";
import Image from "next/image";
import SearchHome from "@/components/SearchHome";
import type { Location, Review } from "@/lib/types";
import ReviewRating from "@/components/ReviewRating";

export default async function Home() {
  const locationsFile = await fs.readFile(
    process.cwd() + "/lib/locations.json",
    "utf8"
  );
  const markers: Location[] = JSON.parse(locationsFile);
  const reviewsFile = await fs.readFile(
    process.cwd() + "/lib/reviews.json",
    "utf8"
  );
  const reviews: Review[] = JSON.parse(reviewsFile);

  // Get busiest airports (Barcelona, Madrid and Mallorca)
  const topLocations = markers.filter((item) => [0, 12, 21].includes(item.id));

  const renderTopLocations = () => {
    return topLocations.map((location: Location) => {
      const locationReviews = reviews.filter(
        (review) => review.locationId === location.id
      );
      const locationRating = locationReviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      const locationRatingAverage = locationReviews.length
        ? locationRating / locationReviews.length
        : 0;

      return (
        <Link href={`/map?location=${location.id}`}>
          <div className="border-2 border-slate-100 rounded grid grid-cols-2">
            <div className="h-[170px] relative">
              <Image
                layout="fill"
                objectFit="cover"
                src={location.src}
                alt={location.name}
              />
            </div>
            <div className="p-2">
              <h3 className="font-medium">{location.name}</h3>
              <ReviewRating rating={locationRatingAverage} />{" "}
              {locationRatingAverage} ({locationReviews.length} reviews)
            </div>
          </div>
        </Link>
      );
    });
  };

  return (
    <main className="p-24">
      <h1 className="text-2xl text-center m-10 font-bold">Airport Reviews</h1>
      <div className="grid grid-rows-2 gap-2">
        <SearchHome markers={markers} />
        <Link
          href="/map"
          className="p-1 flex items-center justify-center bg-sky-100 text-sky-700 hover:bg-sky-200 text-base"
        >
          Search in map
        </Link>
      </div>
      <h2 className="text-xl text-center mt-6 mb-4 font-medium">
        Busiest airports
      </h2>
      <div className="grid grid-cols-3 gap-2">{renderTopLocations()}</div>
    </main>
  );
}
