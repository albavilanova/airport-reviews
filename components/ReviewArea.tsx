import type { Review } from "@/lib/types";
import { getPeriod, sortByKey } from "@/lib/utils";
import ReviewRating from "@/components/ReviewRating";
import Image from 'next/image';

interface ReviewsProps {
  reviews: Review[];
}
export default function ReviewArea(Review: ReviewsProps) {
  const { reviews } = Review;
  const orderedReviews = sortByKey(reviews, "date", true);
  const renderReviews = () => {
    return orderedReviews.map((review: Review) => {
      return (
        <div
          key={review.id}
          className="flex flex-col gap-2 border-2 rounded p-2 m-2"
        >
          {review.images.length > 0 ? (
            <Image
              width={150}
              height={150}
              src={review.images[0]}
              alt="test"
            ></Image>
          ) : null}
          <div>
            {review.firstName} {review.lastName}
          </div>
          <div className="flex items-center">
            <div className="text-xl mr-2">
              <ReviewRating rating={review.rating} />
            </div>
            <div>{getPeriod(review.date)}</div>
          </div>
          <div>{review.comment}</div>
        </div>
      );
    });
  };
  return <div>{renderReviews()}</div>;
}
