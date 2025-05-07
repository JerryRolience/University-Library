"use client";

import BookForm from "@/components/admin/forms/BookForm";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();

  return (
    <>
      <Button onClick={() => router.back()} className="back-btn ">
        <MoveLeft />
        <p className="text-lg">Go Back</p>
      </Button>
      <section className="w-full max-w-2xl">
        <BookForm type="create" />
      </section>
    </>
  );
};

export default page;
