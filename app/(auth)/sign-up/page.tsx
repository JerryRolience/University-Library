"use client";

import AuthForm from "@/components/home/AuthForm";
import { signUpSchema } from "@/lib/validations";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();

  const handleWorkflowTrigger = async (email: string, fullName: string) => {
    try {
      const response = await fetch("/api/workflows/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, fullName }),
      });

      if (!response.ok) {
        throw new Error("Failed to trigger workflow");
      }
    } catch (err) {
      console.error("Workflow trigger error:", err);
    } finally {
    }
  };

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
      onSubmit={async (response: any, email: string, fullName: string) => {
        if (response.message === "User created successfully") {
          await handleWorkflowTrigger(email, fullName);
          router.replace("/sign-in");
        }
      }}
    />
  );
};

export default SignUpPage;
