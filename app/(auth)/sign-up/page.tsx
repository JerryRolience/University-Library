"use client";

import AuthForm from "@/components/AuthForm";
import { signUpSchema } from "@/lib/validations";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{
        email: "",
        password: "",
        fullName: "",
        universityId: "",
        universityCard: "",
      }}
      onSubmit={(response: any) => {
        if (response.message === "User created successfully") {
          router.replace("/sign-in");
        }
      }}
    />
  );
};

export default page;
