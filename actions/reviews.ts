"use server";

import { addReview, getReviews } from "@/lib/reviews";
import { Review } from "@/lib/types";
import { writeFile } from "fs";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

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
  var review: Review = {
    id: reviews.length,
    locationId: location,
    rating: parseInt(ratingField.toString()),
    comment: textField.toString(),
    date: new Date().toISOString(),
    firstName: firstNameField.toString(),
    lastName: lastNameField.toString(),
    images: []
  };

  const imagesField = formData.get("images") as File;
  if (imagesField !== null) {
    const data = new Int8Array(await imagesField.arrayBuffer());
    const fileName = uuidv4() + "." + imagesField.name.split(".").pop()?.toLowerCase();
    writeFile("public/images/" + fileName, data, "binary", (err) => {
      if (err) {
        console.error("Error:", err);
      } else {
        review["images"].push("/images/" + fileName);
      }
    });
  }

  addReview(review);
  revalidatePath("/");
}
