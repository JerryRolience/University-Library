"use client";

import AuthForm from "@/components/home/AuthForm";
import { signInSchema } from "@/lib/validations";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  return (
    <>
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-row gap-3">
            <Image src="/icons/logo.svg" alt="logo" width={37} height={37} priority />
            <h1 className="">BookWise</h1>
          </div>

          {/* <div>{children}</div> */}
          <AuthForm
            type="SIGN_IN"
            schema={signInSchema}
            defaultValues={{
              email: "",
              password: "",
            }}
            onSubmit={(data) => {
              if (data?.user?.role && ["SUPER_ADMIN", "ADMIN"].includes(data?.user?.role)) {
                router.push("/admin");
                return;
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
}
