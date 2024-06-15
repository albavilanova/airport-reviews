"use server";

// import { addReview} from "@/lib/reviews";
import { revalidatePath } from "next/cache";

export async function actionAddReview(formData: FormData) {
  const textField = formData.get("text");
  if (textField === null) {
    throw new Error(`Missing "text" field`);
  }
  const text = textField.toString();
  console.log(`TODO: Add review with text ${text}`);
  revalidatePath("/");
}
