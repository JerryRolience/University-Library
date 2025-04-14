"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserTableProps } from "@/types";
import { getUserTableHeaders } from "@/constants";
import { UserTableHeader } from "../TableHeader";
import { UserRow } from "./UseRow";
import { TableStateRow } from "./TableStateRow";
import { Spinner } from "@/components/home/Spiner";

export function TableComponent({
  initialUsers,
  type,
  title,
  sort,
  sortByName,
  sortAsc,
  loadingUsers,
  errorUsers,
}: UserTableProps) {
  const commonHeaders = getUserTableHeaders(type);

  return (
    <div className="w-full bg-white max-w-full mx-auto rounded-xl shadow border border-gray-200 px-6 pt-6 pb-4">
      <UserTableHeader
        sort={sort}
        title={title}
        sortAsc={sortAsc}
        sortByName={sortByName}
        errorUsers={errorUsers}
      />

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-light-300 hover:bg-light-300 border-b border-gray-100">
              {commonHeaders.map((header) => (
                <TableHead
                  key={header}
                  className="uppercase text-xs font-semibold text-gray-700"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {loadingUsers ? (
              <TableStateRow message={<Spinner />} />
            ) : errorUsers ? (
              <TableStateRow message={errorUsers} isError />
            ) : initialUsers.length === 0 ? (
              <TableStateRow message="No Records found" />
            ) : (
              initialUsers.map((user, index) => (
                <UserRow key={index} user={user} type={type} />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
