"use server";

import { addReview, getReviews } from "@/lib/reviews";
import { revalidatePath } from "next/cache";

export async function actionAddReview(formData: FormData) {

  const usernameField = formData.get("username");
  if (usernameField === null) {
    throw new Error(`Missing "username" field`);
  }

  const ratingField = formData.get("rating");
  if (ratingField === null) {
    throw new Error(`Missing "rating" field`);
  }

  const textField = formData.get("text");
  if (textField === null) {
    throw new Error(`Missing "text" field`);
  }

  let reviews = await getReviews();
  var review = {
    id: reviews.length,
    locationId: 12,
    rating: parseInt(ratingField.toString()),
    comment: textField.toString(),
    date: new Date().toISOString(),
    user: usernameField.toString(),
  };
  addReview(review);

  revalidatePath("/");
}
