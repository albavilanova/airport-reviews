import type { Review } from "@/lib/types";
import { Progress } from "@/components/ui/progress";

interface RatingProps {
  reviews: Review[];
}

function countOccurrance(reviews: Review[], value: number) {
  var count = 0;
  if (reviews) {
    reviews.forEach((x) => {
      if (x.hasOwnProperty("rating") && x.rating === value) count++;
    });
  }
  return count;
}

export default function Rating(Rating: RatingProps) {
  const { reviews } = Rating;
  const countFive = countOccurrance(reviews, 5);
  const countFour = countOccurrance(reviews, 4);
  const countThree = countOccurrance(reviews, 3);
  const countTwo = countOccurrance(reviews, 2);
  const countOne = countOccurrance(reviews, 1);

  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex flex-row gap-3">
        5 <Progress value={(countFive * 100) / reviews.length} />{" "}
        <span className="text-sky-600">({countFive})</span>
      </div>
      <div className="flex flex-row gap-3">
        4 <Progress value={(countFour * 100) / reviews.length} />{" "}
        <span className="text-sky-600">({countFour})</span>
      </div>
      <div className="flex flex-row gap-3">
        3 <Progress value={(countThree * 100) / reviews.length} />{" "}
        <span className="text-sky-600">({countThree})</span>
      </div>
      <div className="flex flex-row gap-3">
        2 <Progress value={(countTwo * 100) / reviews.length} />{" "}
        <span className="text-sky-600">({countTwo})</span>
      </div>
      <div className="flex flex-row gap-3">
        1 <Progress value={(countOne * 100) / reviews.length} />{" "}
        <span className="text-sky-600">({countOne})</span>
      </div>
    </div>
  );
}
