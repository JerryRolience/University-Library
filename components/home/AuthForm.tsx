"use client";

import { AuthFormProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import { fetchRequest } from "@/lib/api";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingSpinner } from "./LoadingSpinner";
import { useState } from "react";
import FileUpload from "./FileUpload";

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: AuthFormProps<T>) => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const isSignIn = type === "SIGN_IN";
  const router = useRouter();

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data: T) => {
    setIsLoading(true);
    try {
      const uri = isSignIn
        ? `${process.env.NEXT_PUBLIC_API}/user/sign-in`
        : `${process.env.NEXT_PUBLIC_API}/user/sign-up`;

      const responseData = await fetchRequest(uri, "POST", data);

      if (responseData.status === 429) {
        toast.error("Too many requests", {
          description: "You're trying too fast. Please wait a moment.",
          style: { backgroundColor: "red", color: "#fff" },
        });
        router.push("/too-fast");
        return;
      }

      if (!responseData.ok) {
        toast.error(isSignIn ? "Sign-in failed" : "Sign-up failed", {
          description:
            responseData.data?.message ||
            "Something went wrong, please try again.",
          style: { backgroundColor: "red", color: "#fff" },
        });
        return;
      }

      if (isSignIn && responseData.data.accessToken) {
        login(responseData.data.accessToken, responseData.data.refreshToken, {
          name: responseData.data.user?.name,
          email: responseData.data.user?.email,
          role: responseData.data.user?.role,
          status: responseData.data.user?.status,
          universityCard: responseData.data.user?.universityCard,
          universityID: responseData.data.user?.universityID,
          profilePic: responseData.data.user?.profilePic,
        });
      }

      toast.success(
        isSignIn ? "Signed in successfully" : "Sign up successful",
        {
          description: isSignIn
            ? "You have successfully signed in!"
            : "Your account has been created!",
          style: { backgroundColor: "green", color: "#fff" },
        }
      );

      onSubmit(responseData.data, data.email, data.fullName);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? "Welcome back to BookWise" : "Create your library account"}
      </h1>
      <p className="text-light-100">
        {isSignIn
          ? "Access the vast collection of resources, and stay updated"
          : "Please complete all fields and upload a valid university ID to gain access to the library"}
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 w-full"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      <FileUpload
                        onFileChange={field.onChange}
                        type="image"
                        accept="image/*"
                        placeholder="Upload your ID"
                        folder="ids"
                        variant="dark"
                      />
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                        className="form-input"
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          {!isSignIn && (
            <div className="text-sm text-muted-foreground p-4 bg-dark-300 rounded-lg">
              <p className="font-medium mb-2">Password Requirements:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>8-64 characters</li>
                <li>Uppercase and lowercase letters</li>
                <li>At least one number</li>
                <li>At least one special character</li>
              </ul>
            </div>
          )}

          <Button
            type="submit"
            className="form-btn w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <LoadingSpinner size="sm" className="text-white" />
                <span>
                  {isSignIn ? "Signing In..." : "Creating Account..."}
                </span>
              </div>
            ) : isSignIn ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
      </Form>

      <p className="text-center text-base font-medium">
        {isSignIn ? "New to BookWise? " : "Already have an account? "}
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-bold text-primary hover:text-primary/80 transition-colors"
        >
          {isSignIn ? "Create an account" : "Sign In"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
