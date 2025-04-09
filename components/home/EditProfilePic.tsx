"use client";

import { EditProfileFormProps } from "@/types";
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
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import { fetchRequest } from "@/lib/api";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingSpinner } from "./LoadingSpinner";
import { useState } from "react";
import FileUpload from "./FileUpload";

const EditProfilePicForm = <T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
}: EditProfileFormProps<T>) => {
  const { editProfilePic } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data: T) => {
    setIsLoading(true);
    try {
      const uri = `${process.env.NEXT_PUBLIC_API}/user/update-user-pic`;
      const token = localStorage.getItem("token");
      const responseData = await fetchRequest(uri, "POST", data, token);

      if (responseData.status === 429) {
        toast.error("Too many requests", {
          description: "You're trying too fast. Please wait a moment.",
          style: { backgroundColor: "red", color: "#fff" },
        });
        router.push("/too-fast");
        return;
      }

      if (!responseData.ok) {
        toast.error("Failed to Edit your profile pic", {
          description:
            responseData.data?.message ||
            "Something went wrong, please try again.",
          style: { backgroundColor: "red", color: "#fff" },
        });
        return;
      }

      await editProfilePic({
        name: responseData.data.user?.name,
        email: responseData.data.user?.email,
        role: responseData.data.user?.role,
        status: responseData.data.user?.status,
        universityCard: responseData.data.user?.universityCard,
        universityID: responseData.data.user?.universityID,
        profilePic: responseData.data.user?.profilePic,
      });

      toast.success("Profile picture updated", {
        description: "Your changes have been saved successfully",
        duration: 3000,
        style: { backgroundColor: "green", color: "#fff" },
      });
      onSubmit(true);
    } catch (error) {
      onSubmit(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4 w-full"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize text-light-100">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "profilePic" ? (
                      <FileUpload
                        onFileChange={field.onChange}
                        type="image"
                        accept="image/*"
                        placeholder="Upload your ID"
                        folder="profile"
                        variant="dark"
                        value={field.value}
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
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )}
            />
          ))}

          <Button
            type="submit"
            className="form-btn w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <LoadingSpinner size="sm" className="text-white" />
                <span>Editing...</span>
              </div>
            ) : (
              "Edit Profile"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditProfilePicForm;
