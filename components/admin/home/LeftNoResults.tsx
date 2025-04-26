import { Button } from "@/components/ui";
import Image from "next/image";

export function LeftNoResult({ type }: { type: string }) {
  return (
    <div className="flex-1 bg-white rounded-2xl shadow p-6  ">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold mb-4">{type}</h3>
      </div>
      <div className="flex flex-col items-center my-9">
        <Image
          src={
            type === "Borrow Records"
              ? "/images/Illustration.png"
              : "/images/illustration.png"
          }
          alt="illustration"
          width={193}
          height={144}
          className="object-cover"
        />
        <h3 className="font-semibold text-xl mt-5">
          {type === "Borrow Records"
            ? " No Pending Book Requests"
            : "No Pending Account Requests"}
        </h3>
        <p className="text-gray-500 text-xl ">
          {type === "Borrow Records"
            ? "There are no book requests for you to review at this time"
            : "  There are currently no account requests awaiting approval"}
        </p>
      </div>
    </div>
  );
}
