import BookForm from "@/components/admin/forms/BookForm";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <Button className="back-btn ">
        <MoveLeft />
        <Link href="/admin/books " className="text-lg">
          Go Back
        </Link>
      </Button>
      <section className="w-full max-w-2xl">
        <BookForm type="create" />
      </section>
    </>
  );
};

export default page;
