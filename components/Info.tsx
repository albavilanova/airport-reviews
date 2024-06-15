import React, { useState } from "react";
import { cn } from "@/lib/utils";
import type { Location } from "@/lib/types";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "@heroicons/react/24/outline";

interface InfoProps {
  location: number;
  markers: Location[];
  setInfoVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setLocation: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function Info(Info: InfoProps) {
  const { location, markers, setInfoVisibility, setLocation } = Info;
  const [reviewsVisibility, setReviewsVisibility] = useState<boolean>(true);
  const [imagesVisibility, setImagesVisibility] = useState<boolean>(false);

  return (
    <div
      className={cn(
        "absolute z-[1000] bg-white w-1/3 h-2/3 right-0",
        "p-4 text-base m-4"
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
          <h2>Reviews</h2>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="images"
          onClick={() => {
            setReviewsVisibility(false);
            setImagesVisibility(true);
          }}
        >
          <h2>Images</h2>
        </ToggleGroupItem>
      </ToggleGroup>
      {reviewsVisibility ? (
        <div>
          <h3 className="font-medium p-2">Reviews</h3>
          <Button className="flex justify-center bg-sky-100 text-sky-700 hover:bg-sky-200">
            Write a review
          </Button>
        </div>
      ) : null}
      {imagesVisibility ? <div>Images</div> : null}
    </div>
  );
}
