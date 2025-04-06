"use client";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function NoBooks() {
  const router = useRouter();
  return (
    <div className="bg-dark-300 rounded-lg p-6 sm:p-8 text-center">
      <p className="text-light-200 text-sm sm:text-base">
        You haven't borrowed any books yet
      </p>
      <Button
        className="mt-3 sm:mt-4 px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg text-light-100 transition-colors text-sm sm:text-base"
        onClick={() => router.push("/")}
      >
        Browse Books
      </Button>
    </div>
  );
}
