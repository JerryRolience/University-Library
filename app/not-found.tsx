"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiHome, FiArrowRight } from "react-icons/fi";

export default function NotFound() {
  const router = useRouter;
  return (
    <main className="root-container">
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-dark-900 to-dark-800 p-4 text-center">
        <div className="max-w-md mx-auto bg-dark-500/50 backdrop-blur-sm border border-dark-500 rounded-xl p-8 shadow-2xl">
          {/* 404 Illustration */}
          <div className="relative w-40 h-40 mx-auto mb-6">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"></div>
            <div className="absolute inset-4 bg-primary/30 rounded-full animate-pulse delay-100"></div>
            <div className="absolute inset-8 flex items-center justify-center bg-primary rounded-full">
              <span className="text-4xl font-bold text-white">404</span>
            </div>
          </div>

          {/* Content */}
          <h1 className="text-3xl font-bold text-light-100 mb-3">
            Page Not Found
          </h1>
          <p className="text-light-300 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={"/"}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-dark-500 text-dark-100 font-semibold hover:text-primary rounded-lg transition-all hover:shadow-xl"
            >
              <FiHome className="text-lg" />
              Return Home
            </Link>
            {/* <Link
              href="/books/1"
              className="flex items-center justify-center gap-2 px-6 py-3 border font-semibold border-dark-700 hover:border-primary text-light-200 hover:text-dark-100 hover:bg-primary rounded-lg transition-all"
            >
              Go back
              <FiArrowRight className="text-lg" /> */}
            {/* </Link> */}
          </div>
        </div>
      </main>
    </main>
  );
}
