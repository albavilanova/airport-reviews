"use client";

import { actionAddReview } from "@/actions/reviews";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ReviewFormProps {
  location: number;
}

export default function ReviewForm(ReviewForm: ReviewFormProps) {
  const { location } = ReviewForm;
  const formRef = useRef<HTMLFormElement>(null);

  const addReview = async (formData: FormData) => {
    formRef.current?.reset();
    await actionAddReview(formData, location);
  };

  return (
    <form ref={formRef} action={addReview} className="mt-2">
      <RadioGroup
        defaultValue="5"
        name="rating"
        className="flex justify-center m-3"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="1" id="1" />
          <Label htmlFor="1">1</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="2" id="2" />
          <Label htmlFor="2">2</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="3" id="3" />
          <Label htmlFor="3">3</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="4" id="4" />
          <Label htmlFor="4">4</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="5" id="5" />
          <Label htmlFor="5">5</Label>
        </div>
      </RadioGroup>
      <div className="flex flex-cols-2 mb-3">
        <input
          type="text"
          name="firstName"
          placeholder="First name"
          className="w-full border border-slate-300 p-2 rounded focus:outline-1 focus:outline-sky-200 mr-1"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last name"
          className="w-full border border-slate-300 p-2 rounded focus:outline-1 focus:outline-sky-200"
        />
      </div>
      <div className="flex">
        <label
          htmlFor="images"
          className="text-center w-full bg-slate-100 hover:bg-slate-200 text-sm p-2 border-1 rounded border-slate-600"
        >
          Upload images
        </label>
        <input
          type="file"
          name="images"
          id="images"
          className="hidden"
          multiple={true}
          accept="image/*"
        ></input>
      </div>
      <textarea
        name="text"
        rows={10}
        cols={50}
        placeholder="Share the details of your experience in this place here..."
        className="w-full border border-slate-30 p-2 mb-3 mt-3 rounded focus:outline-1 focus:outline-sky-200 grow"
      ></textarea>
      <div className="flex justify-end">
        <Button className="bg-sky-100 text-sky-700 hover:bg-sky-200 text-xl">
          Post
        </Button>
      </div>
    </form>
  );
}
