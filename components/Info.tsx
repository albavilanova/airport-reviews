import React, { useState } from "react";
import { cn } from "@/lib/utils";
import type { Location } from "@/lib/types";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { XCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LocationRating from "@/components/LocationRating";
import ReviewForm from "@/components/ReviewForm";
import ReviewArea from "@/components/ReviewArea";
import ImageArea from "@/components/ImageArea";
import type { Review } from "@/lib/types";

interface InfoProps {
  location: number;
  markers: Location[];
  reviews: Review[];
  setInfoVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setLocation: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function Info(Info: InfoProps) {
  const { location, markers, reviews, setInfoVisibility, setLocation } = Info;
  const [reviewsVisibility, setReviewsVisibility] = useState<boolean>(true);
  const [imagesVisibility, setImagesVisibility] = useState<boolean>(false);
  const locationReviews = reviews.filter((f) =>
    [{ locationId: location }].some((s) => f["locationId"] == s["locationId"])
  );
  const [value, setValue] = React.useState("reviews");
  return (
    <div
      className={cn(
        "absolute z-[2] bg-white w-full md:w-1/3 h-screen right-0 overflow-auto",
        "p-4 text-base"
      )}
    >
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setInfoVisibility(false);
            setLocation(null);
          }}
          className="bg-transparen hover:bg-transparent"
        >
          <XCircleIcon className="h-6 w-6 mr-2 text-sky-700 bg:text-sky-900" />
        </Button>
      </div>
      <h1 className="text-center text-xl font-bold p-2">
        {markers[location].name}
      </h1>
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(value) => {
          if (value) setValue(value);
        }}
        className="p-2"
      >
        <ToggleGroupItem
          value="reviews"
          onClick={() => {
            setReviewsVisibility(true);
            setImagesVisibility(false);
          }}
        >
          <h2 className="text-l text-sky-700">Reviews</h2>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="images"
          onClick={() => {
            setReviewsVisibility(false);
            setImagesVisibility(true);
          }}
        >
          <h2 className="text-l text-sky-700">Images</h2>
        </ToggleGroupItem>
      </ToggleGroup>
      {reviewsVisibility ? (
        <div>
          <LocationRating reviews={locationReviews} />
          <div className="flex justify-center">
            <Dialog>
              <DialogTrigger>
                <Button className="bg-sky-100 text-sky-700 hover:bg-sky-200 text-base">
                  <PencilSquareIcon className="h-6 w-6 mr-2 text-sky-700 bg:text-sky-900" />{" "}
                  Write a review
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Review {markers[location].name}</DialogTitle>
                  <DialogDescription>
                    <ReviewForm location={location} />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <ReviewArea reviews={locationReviews} />
        </div>
      ) : null}
      {imagesVisibility ? (
        <div>
          <ImageArea reviews={locationReviews} />
        </div>
      ) : null}
    </div>
  );
}
