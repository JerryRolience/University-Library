"use client";

import AuthForm from "@/components/AuthForm";
import { signInSchema } from "@/lib/validations";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={(response: any) => {
        if (response.message === "User signed in successfully") {
          router.refresh();
          router.push("/");
        }
      }}
    />
  );
};

export default page;
