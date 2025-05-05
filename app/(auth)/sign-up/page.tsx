"use client";

import AuthForm from "@/components/home/AuthForm";
import { signUpSchema } from "@/lib/validations";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
    <>
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-row gap-3">
            <Image src="/icons/logo.svg" alt="logo" width={37} height={37} priority />
            <h1 className="">BookWise</h1>
          </div>

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
        </div>
      </section>

      <section className="auth-illustration">
        <Image src="/images/auth-illustration.png" alt="auth illustration" height={1000} width={1000} className="size-full object-cover" priority />
      </section>
    </>
  );
};

export default SignUpPage;
