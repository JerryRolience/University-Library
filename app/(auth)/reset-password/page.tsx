"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { fetchRequest } from "@/lib/api";
import { LoadingSpinner } from "@/components/home";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

const formSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters").max(64, "Password must be less than 64 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");
  const sig = searchParams.get("sig");

  useEffect(() => {
    if (!token || !sig) {
      router.push("/forgot-password?error=invalid_link");
      return;
    }

    const validateToken = async () => {
      try {
        const response = await fetchRequest(`${process.env.NEXT_PUBLIC_API}/api/auth/validate-password-token`, "POST", { token, sig });
        if (!response.data?.valid) throw new Error("Invalid token");
      } catch (error) {
        router.push("/forgot-password?error=invalid_token");
      }
    };

    validateToken();
  }, [token, sig, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!token) {
      toast.error("Invalid reset link", {
        style: { backgroundColor: "red", color: "white" },
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetchRequest(`${process.env.NEXT_PUBLIC_API}/api/auth/reset-password`, "POST", {
        token,
        sig,
        newPassword: values.password,
      });

      if (!response.ok) {
        throw new Error(response.data?.message || "Failed to reset password");
      }

      toast.success("Password reset successfully", {
        description: "You can now sign in with your new password",
        style: { backgroundColor: "green", color: "white" },
      });
      router.push("/sign-in");
    } catch (error) {
      toast.error("Error resetting password", {
        description: error instanceof Error ? error.message : "Please try again",
        style: { backgroundColor: "red", color: "white" },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <div className="auth-box w-[500px]">
        <div className="flex flex-row gap-3">
          <Image src="/icons/logo.svg" alt="logo" width={37} height={37} priority />
          <h1 className="">BookWise</h1>
        </div>

        <div className="w-full space-y-6 rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-light-100">Reset your password</h2>
            <p className="mt-2 text-sm text-light-300">Enter and confirm your new password below</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type={showPassword ? "text" : "password"} placeholder="••••••••" autoComplete="new-password" {...field} className="pr-10" />
                        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" autoComplete="new-password" {...field} className="pr-10" />
                        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-sm text-muted-foreground p-4 bg-dark-300 rounded-lg">
                <p className="font-medium mb-2">Password Requirements:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>8-64 characters</li>
                </ul>
              </div>

              <Button type="submit" className="w-full h-14 text-lg text-dark-100" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <LoadingSpinner className="h-4 w-4 text-dark-300" />
                    Resetting...
                  </span>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </Form>

          <div className="text-center text-sm pt-4">
            <Link href="/sign-in" className="font-medium text-primary hover:text-primary/80">
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
