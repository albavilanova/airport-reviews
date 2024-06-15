"use client";

import { actionAddReview } from "@/actions/reviews";
import { useRef } from "react";

export default function ReviewsForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const addReview = async (formData: FormData) => {
    formRef.current?.reset();
    await actionAddReview(formData);
  };

  return (
    <form ref={formRef} action={addReview}>
      <input
        type="text"
        name="text"
        className="border border-black p-1 mr-2 rounded"
      />
      <button>Add Review</button>
    </form>
  );
}
