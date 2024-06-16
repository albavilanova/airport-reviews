interface ReviewRatingProps {
  rating: number;
}

export default function ReviewRating(ReviewRating: ReviewRatingProps) {
  const { rating } = ReviewRating;
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? "text-amber-400" : "text-stone-300"}
        >
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return <>{renderStars()}</>;
}
