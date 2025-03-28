import React from "react";

const page = () => {
  return (
    <main className="root-container flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-5xl font-bebas-neue font-bold text-light-100">
        Whoa, You're moving too fast. Slow Down There.
      </h1>
      <p className="text-light-400 mt-3 max-w-xl text-center">
        Looks like you&apos;ve been a little too eager. We&apos;ve put a
        temporary hold on your account. Please try again shortly.
      </p>
    </main>
  );
};

export default page;
