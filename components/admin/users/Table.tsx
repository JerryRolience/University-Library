"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { users as initialUsers } from "@/constants";
import Image from "next/image";
import { Trash2, ExternalLink, ArrowUpDown, CircleX } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui";
import { StatusDropdown } from "./StatusDropDown";
import { DropdownOption } from "@/types";

export function TableComponent({
  type,
  title,
  sort,
}: {
  title: string;
  sort: string;
  type: "ALL USERS" | "ACCOUNT REQUEST";
}) {
  const [roles, setRoles] = useState(initialUsers.map((u) => u.role));
  const [users, setUsers] = useState(initialUsers);
  const [sortAsc, setSortAsc] = useState(true);

  const updateRole = (index: number, newRole: string) => {
    const updatedRoles = [...roles];
    updatedRoles[index] = newRole;
    setRoles(updatedRoles);
  };

  const sortByName = () => {
    const sortedUsers = [...users].sort((a, b) =>
      sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setUsers(sortedUsers);
    setSortAsc(!sortAsc);
  };

  const roleOptions: DropdownOption[] = [
    {
      value: "User",
      label: "User",
      colorClass: "text-pink-700",
      backgroundColor: "bg-pink-100",
    },
    {
      value: "Admin",
      label: "Admin",
      colorClass: "text-green-700",
      backgroundColor: "bg-green-100",
    },
  ];

  return (
    <div className="w-full bg-white max-w-full mx-auto  rounded-xl shadow border border-gray-200 px-6 pt-6 pb-4">
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
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-light-300 hover:bg-light-300 border-b border-gray-100">
              <TableHead className="uppercase text-xs font-semibold text-gray-700 ">
                Name
              </TableHead>
              <TableHead className="uppercase text-xs font-semibold text-gray-700">
                Date Joined
              </TableHead>
              {type === "ALL USERS" && (
                <>
                  <TableHead className="uppercase text-xs font-semibold text-gray-700">
                    Role
                  </TableHead>
                  <TableHead className="uppercase text-xs font-semibold text-gray-700">
                    Books Borrowed
                  </TableHead>
                </>
              )}
              <TableHead className="uppercase text-xs font-semibold text-gray-700">
                University ID No
              </TableHead>
              <TableHead className="uppercase text-xs font-semibold text-gray-700">
                University ID Card
              </TableHead>
              <TableHead className="uppercase text-xs font-semibold text-gray-700">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow
                key={index}
                className="hover:bg-gray-50 border-b border-gray-200/50"
              >
                <TableCell className="pl-4 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                      <Image
                        src="/images/test-user.jpg"
                        alt="User"
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{user.name}</div>
                      <div className="text-gray-500 text-xs">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{user.dateJoined}</TableCell>
                {type === "ALL USERS" && (
                  <>
                    <TableCell>
                      <StatusDropdown
                        currentValue={roles[index]}
                        options={roleOptions}
                        onSelect={(role) => updateRole(index, role)}
                      />
                    </TableCell>
                    <TableCell className="text-sm">
                      {user.booksBorrowed}
                    </TableCell>
                  </>
                )}
                <TableCell className="text-sm">{user.universityID}</TableCell>
                <TableCell>
                  <button className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
                    View ID Card <ExternalLink size={14} />
                  </button>
                </TableCell>
                <TableCell className="pr-4">
                  {type === "ALL USERS" ? (
                    <button className="text-red-500 hover:text-red-700">
                      <Trash2 size={20} />
                    </button>
                  ) : (
                    <div className="flex items-center gap-6">
                      <Button className="bg-[#a7dabc] hover:bg-green-200">
                        Approve Account
                      </Button>
                      <div className="text-red-400 hover:text-red-600">
                        <CircleX size={24} />
                      </div>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
