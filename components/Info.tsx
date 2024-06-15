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
import Rating from "@/components/Rating";
import ReviewsForm from "@/components/ReviewsForm";
import Reviews from "@/components/Reviews";
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
  return (
    <div
      className={cn(
        "absolute z-[1000] bg-white w-1/3 h-full right-0",
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
      <h1 className="text-center text-lg font-bold p-2">
        {markers[location].name}
      </h1>
      <ToggleGroup type="single">
        <ToggleGroupItem
          value="reviews"
          onClick={() => {
            setReviewsVisibility(true);
            setImagesVisibility(false);
          }}
        >
          <h2 className="text-lg text-sky-700">Reviews</h2>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="images"
          onClick={() => {
            setReviewsVisibility(false);
            setImagesVisibility(true);
          }}
        >
          <h2 className="text-lg text-sky-700">Images</h2>
        </ToggleGroupItem>
      </ToggleGroup>
      {reviewsVisibility ? (
        <div>
          <h3 className="font-medium p-2">Reviews</h3>
          <Rating />
          <div className="flex justify-center">
            <Dialog>
              <DialogTrigger>
                <Button className="bg-sky-100 text-sky-700 hover:bg-sky-200 text-lg">
                  <PencilSquareIcon className="h-6 w-6 mr-2 text-sky-700 bg:text-sky-900" />{" "}
                  Write a review
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Review {markers[location].name}</DialogTitle>
                  <DialogDescription>
                    <ReviewsForm />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <Reviews reviews={reviews} />
        </div>
      ) : null}
      {imagesVisibility ? <div>Images</div> : null}
    </div>
  );
}
