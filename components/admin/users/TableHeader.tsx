import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

export function UserTableHeader({
  title,
  sort,
  sortByName,
  sortAsc,
}: {
  sort: string;
  title: string;
  sortAsc: boolean;
  errorUsers: string | null;
  sortByName: () => void;
}) {
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <div className="flex items-center justify-center gap-3 ">
          <span>{sort}</span>{" "}
          <ArrowUpDown
            size={20}
            onClick={sortByName}
            className={`${sortAsc ? "rotate-0" : "rotate-180"} hover:opacity-80 transition-transform duration-200`}
          />
          {title === "All Books" && (
            <Button
              className="bg-primary-admin  hover:bg-primary-admin/60"
              asChild
            >
              <Link href="/admin/books/new" className="text-white">
                + Create a New Book
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
