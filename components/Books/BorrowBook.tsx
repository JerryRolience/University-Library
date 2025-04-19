"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { fetchRequest } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoadingSpinner } from "../home/LoadingSpinner";
import { useAuth } from "@/contexts/AuthContext";

export function BorrowBook({
  bookId,
  title,
  author,
}: {
  bookId: string;
  title: string;
  author: string;
}) {
  const { user } = useAuth();

  const router = useRouter();
  const [isBorrowing, setIsBorrowing] = useState(false);

  const triggerWorkflow = async (borrowRecord: any) => {
    try {
      const workflowResponse = await fetch("/api/workflows/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user?.email,
          fullName: user?.name,
          bookTitle: title,
          borrowDate: borrowRecord.borrowedDate.toISOString(),
          dueDate: borrowRecord.dueDate.toISOString(),
          borrowId: borrowRecord.id,
        }),
      });

      if (!workflowResponse.ok) {
        console.error("Failed to trigger workflow");
      }
    } catch (error) {
      console.error("Workflow trigger error:", error);
    }
  };

  const handleBorrow = async () => {
    try {
      setIsBorrowing(true);
      const uri = `${process.env.NEXT_PUBLIC_API}/book/borrow-book`;
      const data = { bookId };
      const token = localStorage.getItem("token");
      const responseData = await fetchRequest(uri, "POST", data, token);

      if (responseData.status === 429) {
        setIsBorrowing(false);
        toast.error("Too many requests", {
          description: "You're trying too fast. Please wait a moment.",
          style: { backgroundColor: "red", color: "#fff" },
        });
        router.push("/too-fast");
        return;
      }

      if (!responseData.ok) {
        setIsBorrowing(false);
        toast.error("Borrowing Book failed", {
          description:
            responseData.data?.message ||
            "Something went wrong, please try again.",
          style: { backgroundColor: "red", color: "#fff" },
        });
        return;
      }

      // Trigger workflow after successful borrow
      await triggerWorkflow(responseData.data);

      toast.success("Book borrowed successfully", {
        description: "You can now read the book.",
        style: { backgroundColor: "green", color: "#fff" },
      });
      router.push("/my-profile");
    } finally {
      setIsBorrowing(false);
    }
  };

  return (
    <Button className="book-overview_btn" onClick={handleBorrow}>
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />
      <div className="font-bebas-neue text-xl text-dark-100">
        {isBorrowing ? (
          <div className="flex items-center gap-2">
            <LoadingSpinner size="sm" className="text-white" />
            <span>Borrowing...</span>
          </div>
        ) : (
          "Borrow Book"
        )}
      </div>
    </Button>
  );
}
