"use client";

import { LoadingSpinner } from "@/components/home";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { fetchRequest } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  const handleWorkflowTrigger = async (email: string, resetLink: string) => {
    try {
      const response = await fetch("/api/workflows/send-reset-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, resetLink }),
      });

      if (!response.ok) {
        throw new Error("Failed to trigger workflow");
      }
    } catch (err) {
      console.error("Workflow trigger error:", err);
    } finally {
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (lastRequestTime && Date.now() - lastRequestTime < 30000) {
      toast.warning("Please wait 30 seconds before trying again", {
        style: { backgroundColor: "yellowgreen" },
      });
      return;
    }

    setIsLoading(true);
    setLastRequestTime(Date.now());

    try {
      const normalizedEmail = values.email.toLowerCase().trim();
      const response = await fetchRequest(`${process.env.NEXT_PUBLIC_API}/auth/forgot-password`, "POST", { email: normalizedEmail });

      if (!response.ok) throw new Error(response.data?.message || "Failed to send reset link");

      const resetLink = `${process.env.NEXT_PUBLIC_PROD_API_ENDPOINT}reset-password?token=${response.data.token}&sig=${response.data.emailJWT}`;

      await handleWorkflowTrigger(normalizedEmail, resetLink);
      toast.success("Reset link sent", {
        description: "Check your email for the password reset link",
        style: { backgroundColor: "green", color: "white" },
      });
      setIsSubmitted(true);
    } catch (error) {
      toast.error("Error sending reset link", {
        description: error instanceof Error ? error.message : "Please try again later",
        style: { backgroundColor: "red", color: "white" },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="my-auto flex h-full min-h-screen flex-1 items-center bg-pattern bg-cover bg-top bg-dark-100 px-5 py-10">
      <div className="gradient-vertical mx-auto flex w-[500px] flex-col gap-6 rounded-lg p-10">
        <Link href="/" className="flex flex-row gap-3 items-center">
          <Image src="/icons/logo.svg" alt="logo" width={37} height={37} priority />
          <h1>BookWise</h1>
        </Link>

        <div className="w-full space-y-6 rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-light-100">Forgot your password?</h2>
            <p className="mt-2 text-sm text-light-300">{isSubmitted ? "Check your email for the reset link" : "Enter your email to receive a reset link"}</p>
          </div>

          {!isSubmitted && (
            <>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email address</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" type="email" autoComplete="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full text-dark-100" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <LoadingSpinner className="h-4 w-4 text-dark-300" />
                        Sending...
                      </span>
                    ) : (
                      "Send reset link"
                    )}
                  </Button>
                </form>
              </Form>

              <div className="text-sm text-muted-foreground p-4 bg-dark-300 rounded-lg">
                <p className="font-medium mb-2">You'll receive a link in your email to:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Create a new password</li>
                  <li>Expires after 30 mins</li>
                  <li>Check your spam folder if you don't see it</li>
                </ul>
              </div>
            </>
          )}

          {isSubmitted && (
            <div className="text-center">
              <p className="text-sm text-light-300">
                Didn't receive the email?{" "}
                <button onClick={() => setIsSubmitted(false)} className="font-medium text-primary hover:text-primary/80">
                  Try again
                </button>
              </p>
            </div>
          )}

          <div className="text-center text-sm ">
            <Link href="/sign-in" className="font-medium text-primary hover:text-primary/80">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
