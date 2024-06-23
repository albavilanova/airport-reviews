"use client";

import type { Review } from "@/lib/types";
import { getPeriod, sortByKey } from "@/lib/utils";
import Image from "next/image";

interface ReviewsProps {
  reviews: Review[];
}
export default function ImageArea(Review: ReviewsProps) {
  const { reviews } = Review;
  const orderedReviews = sortByKey(reviews, "date", true);

  const renderReviews = () => {
    return orderedReviews.map((review: Review) => {
      return (
        <div className="grid grid-cols-2 gap-2 p-2">
          {review.images.length > 0
            ? review.images.map((image: string) => (
                <div className="relative">
                  <div
                    style={{
                      position: "relative",
                      width: "auto",
                      height: "200px",
                    }}
                  >
                    <Image
                      key={image}
                      layout="fill"
                      objectFit="cover"
                      src={image}
                      alt={image}
                    />
                  </div>
                  <h3 className="absolute inset-0 p-1 bg-sky-900 h-fit w-fit text-sm text-white">
                    @ {review.firstName} {review.lastName}
                  </h3>
                </div>
              ))
            : null}
        </div>
      );
    });
  };
  return <div>{renderReviews()}</div>;
}
