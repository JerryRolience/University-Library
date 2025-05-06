"use client";

import { LoadingSpinner } from "@/components/home";
import FileUpload from "@/components/home/FileUpload";
import { Button } from "@/components/ui";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fetchRequest } from "@/lib/api";
import { bookSchema } from "@/lib/validations";
import { BookFormProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import ColorPicker from "../ColorPicker";

export default function BookForm({ type, book }: BookFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const create = type === "create";
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: create ? "" : book?.title,
      description: create ? "" : book?.description,
      author: create ? "" : book?.author,
      genre: create ? "" : book?.genre,
      rating: create ? 1 : book?.rating,
      totalCopies: create ? 1 : book?.totalCopies,
      coverUrl: create ? "" : book?.coverUrl,
      coverColor: create ? "" : book?.coverColor,
      videoUrl: create ? "" : book?.videoUrl,
      summary: create ? "" : book?.summary,
    },
  });

  const onSubmit = async (values: z.infer<typeof bookSchema>) => {
    setIsLoading(true);
    try {
      const uri = create ? `${process.env.NEXT_PUBLIC_API}/book/create-book` : `${process.env.NEXT_PUBLIC_API}/book/update-book`;

      const storedToken = localStorage.getItem("token");

      const requestData = create ? values : { bookData: values, bookId: book?.id };

      const response = await fetchRequest(uri, "POST", requestData, storedToken);

      if (response.status === 429) {
        toast.error("Too many requests", {
          description: "Please wait a moment before trying again.",
          style: { backgroundColor: "red", color: "#fff" },
        });
        router.push("/too-fast");
        return;
      }

      if (!response.ok) {
        throw new Error(response.data?.message || "Something went wrong");
      }

      toast.success(`Book ${create ? "added" : "updated"} successfully`, {
        style: { backgroundColor: "green", color: "#fff" },
      });

      router.push(`/admin/books/book/${response.data.data.id || book?.id}`);
      router.refresh();
    } catch (error) {
      toast.error(`Failed to ${create ? "add" : "update"} book`, {
        description: error instanceof Error ? error.message : "Please try again",
        style: { backgroundColor: "red", color: "#fff" },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">Book Title</FormLabel>
              <FormControl>
                <Input required placeholder="Book Title" {...field} className="book-form_input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">Author</FormLabel>
              <FormControl>
                <Input required placeholder="Book author" {...field} className="book-form_input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">Genre</FormLabel>
              <FormControl>
                <Input required placeholder="Book genre" {...field} className="book-form_input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">Rating</FormLabel>
              <FormControl>
                <Input required type="number" min={1} max={5} placeholder="Book rating" {...field} className="book-form_input" onChange={(e) => field.onChange(parseInt(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalCopies"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">Total Copies</FormLabel>
              <FormControl>
                <Input required type="number" min={1} placeholder="Total copies" {...field} className="book-form_input" onChange={(e) => field.onChange(parseInt(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverUrl"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">Book Cover</FormLabel>
              <FormControl>
                <FileUpload onFileChange={field.onChange} value={field.value} type="image" accept="image/*" placeholder="Upload book cover" folder="books/covers" variant="light" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverColor"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">Primary Color</FormLabel>
              <FormControl>
                <ColorPicker value={field.value} onPickerChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Book description" {...field} rows={5} className="book-form_input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">Book Trailer</FormLabel>
              <FormControl>
                <FileUpload onFileChange={field.onChange} value={field.value} type="video" accept="video/*" placeholder="Upload book trailer" folder="books/videos" variant="light" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">Summary</FormLabel>
              <FormControl>
                <Textarea placeholder="Brief summary" {...field} rows={3} className="book-form_input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="book-form_btn text-white w-full" disabled={isLoading}>
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <LoadingSpinner className="h-5 w-5" />
              {create ? "Adding Book..." : "Updating Book..."}
            </div>
          ) : create ? (
            "Add Book to Library"
          ) : (
            "Update Book"
          )}
        </Button>
      </form>
    </Form>
  );
}
