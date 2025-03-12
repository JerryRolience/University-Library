import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

import localFont from "next/font/local";
import { ReactNode } from "react";
import { fetchRequest } from "@/lib/api";
// import { SessionProvider } from "next-auth/react";
// import { auth } from "@/auth";

const ibmPlexSans = localFont({
  src: [
    { path: "/fonts/IBMPlexSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "/fonts/IBMPlexSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "/fonts/IBMPlexSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "/fonts/IBMPlexSans-Bold.ttf", weight: "700", style: "normal" },
  ],
});

const bebasNeue = localFont({
  src: [
    { path: "/fonts/BebasNeue-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--bebas-neue",
});

export const metadata: Metadata = {
  title: "BookWise",
  description:
    "BookWise is a book borrowing university library management solution.",
};

// const users = await fetchRequest("http://localhost:4000/user/getUsers", "GET");
// console.log(users);

// const newUser = {
//   fullName: "John Doe",
//   email: "john@example.com",
//   password: "password123",
//   universityCard: "123456",
//   role: "USER",
// };

// const result = await fetchRequest(
//   "http://localhost:4000/user/signUp",
//   "POST",
//   newUser
// );
// console.log(result);

const RootLayout = async ({ children }: { children: ReactNode }) => {
  // const session = await auth();

  return (
    <html lang="en">
      {/* <SessionProvider session={session}> */}
      <body
        className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased`}
      >
        {children}

        <Toaster />
      </body>
      {/* </SessionProvider> */}
    </html>
  );
};

export default RootLayout;
