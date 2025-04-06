"use client";

import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  text?: string;
  textClassName?: string;
}

export const LoadingSpinner = ({
  className,
  size = "md",
  text,
  textClassName = "text-gray-500 dark:text-gray-400",
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-[3px]",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={cn(
          "inline-block animate-spin rounded-full border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
          sizeClasses[size],
          className
        )}
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
      {text && (
        <p className={cn("text-sm font-medium", textClassName)}>{text}</p>
      )}
    </div>
  );
};

interface LoadingPageProps {
  text?: string;
  spinnerClassName?: string;
}

export const LoadingPage = ({
  text = "Loading your content...",
  spinnerClassName = "text-blue-500",
}: LoadingPageProps) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900/50 backdrop-blur-sm z-50 gap-4">
      <LoadingSpinner
        size="lg"
        className={spinnerClassName}
        text={text}
        textClassName="text-white"
      />
    </div>
  );
};
