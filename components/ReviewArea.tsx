import type { Review } from "@/lib/types";
import { getPeriod } from "@/lib/utils";

interface ReviewsProps {
  reviews: Review[];
}
export default function ReviewArea(Review: ReviewsProps) {
  const { reviews } = Review;
  const renderReviews = () => {
    return reviews.map((review: Review) => {
      return (
        <div className="flex flex-col gap-2 border-2 rounded p-2 m-2">
          <div>{review.user}</div>
          <div>{getPeriod(review.date)}</div>
          <div>{review.comment}</div>
        </div>
      );
    });
  };
  return <div>{renderReviews()}</div>;
}
