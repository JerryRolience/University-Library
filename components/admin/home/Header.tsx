import { User } from "@/types";
import { Input } from "../../ui/input";
import { Search } from "lucide-react";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { AdminProfile } from "./AdminProfile";

export default function Header({ userDetails }: { userDetails: User | null }) {
  const user = userDetails;

  return (
    <header className="admin-header -mt-6">
      <AdminProfile user={user} />
      <div className="relative w-full max-w-[450px]">
        <button className="absolute left-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-colors">
          <Search />
        </button>
        <Input
          type="text"
          placeholder="Search users, books by title, author, or genre."
          className="w-full pl-12 pr-4 py-8 rounded-lg text-light-100 focus:outline-slate-100"
        />
      </div>
    </header>
  );
}
