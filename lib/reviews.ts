"use server";

import { promises as fs } from "fs";
import type { Review } from "@/lib/types";

export const getReviews = async () => {
  const file = await fs.readFile(process.cwd() + "/lib/reviews.json", "utf8");
  const reviews: Review[] = JSON.parse(file);
  return reviews;
};

export const addReview = async (review: Review) => {
  let reviews = await getReviews();
  reviews.push(review);
  fs.writeFile(
    process.cwd() + "/lib/reviews.json",
    JSON.stringify(reviews),
    "utf8"
  );
};
