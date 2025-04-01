"use client";

import AuthForm from "@/components/AuthForm";
import config from "@/lib/config";
import { signUpSchema } from "@/lib/validations";
import { workflowClient } from "@/lib/workflow";
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
      onSubmit={(response: any, email: string, fullName: string) => {
        if (response.message === "User created successfully") {
          workflowClient.trigger({
            url: `${config.env.prodApiEndpoint}/api/workflows/onboarding`,
            body: {
              email,
              fullName,
            },
          });
          router.replace("/sign-in");
        }
      }}
    />
  );
};

export default page;
