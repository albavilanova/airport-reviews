import type { Review } from "@/lib/types";
import { getPeriod, sortByKey } from "@/lib/utils";

interface ReviewsProps {
  reviews: Review[];
}
export default function ReviewArea(Review: ReviewsProps) {
  const { reviews } = Review;
  const orderedReviews = sortByKey(reviews, "date", true);
  const renderReviews = () => {
    return orderedReviews.map((review: Review) => {
      return (
        <div className="flex flex-col gap-2 border-2 rounded p-2 m-2">
          <div>{review.username}</div>
          <div>{getPeriod(review.date)}</div>
          <div>{review.comment}</div>
        </div>
      );
    });
  };
  return <div>{renderReviews()}</div>;
}
