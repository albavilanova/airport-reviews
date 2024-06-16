"use server";

import { addReview, getReviews } from "@/lib/reviews";
import { revalidatePath } from "next/cache";

export async function actionAddReview(formData: FormData, location: number) {
  const firstNameField = formData.get("firstName");
  if (firstNameField === null) {
    throw new Error(`Missing "firstName" field`);
  }

  const lastNameField = formData.get("lastName");
  if (lastNameField === null) {
    throw new Error(`Missing "lastName" field`);
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
    locationId: location,
    rating: parseInt(ratingField.toString()),
    comment: textField.toString(),
    date: new Date().toISOString(),
    firstName: firstNameField.toString(),
    lastName: lastNameField.toString()
  };
  addReview(review);

  revalidatePath("/");
}
