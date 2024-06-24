"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const router = useRouter();

  return (
    <div className="p-6 md:p-24">
      <h2 className="text-center text-l pb-4 font-medium">Something went wrong!</h2>
      <div className="grid grid-cols-2 gap-2">
        <Button
          className="bg-sky-100 text-sky-700 hover:bg-sky-200 text-l font-normal"
          onClick={() => router.push("/")}
        >
          Go to home page
        </Button>
        <Button
          className="bg-sky-100 text-sky-700 hover:bg-sky-200 text-l font-normal"
          onClick={() => reset()}
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
