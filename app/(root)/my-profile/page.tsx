"use client";

import BookList from "@/components/BookList";
import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";
import { fetchRequest } from "@/lib/api";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

function page() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const res = await fetchRequest(
        `${process.env.NEXT_PUBLIC_API}/user/logout`,
        "GET"
      );

      if (res.ok) {
        toast.success("Logged out successfully", {
          style: { backgroundColor: "green", color: "#fff" },
        });
        router.replace("/sign-in");
      } else {
        toast.error("Logout failed", {
          description: "Please try again",
          style: { backgroundColor: "red", color: "#fff" },
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        description:
          typeof error === "string" ? error : "An unexpected error occurred",
        style: { backgroundColor: "red", color: "#fff" },
      });
    }
  };
  return (
    <>
      <form
        action={async () => {
          //   "use server";
        }}
        className="mb-10"
      >
        <Button onClick={handleLogout}>Logout</Button>
      </form>

      <BookList
        title="Borrowed Books"
        books={sampleBooks}
        containerClassName={""}
      />
    </>
  );
}

export default page;
