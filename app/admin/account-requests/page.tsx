"use client";

import { TableComponent } from "@/components/admin/users/table/Table";
import { useUserContext } from "@/contexts/UserContext";

const AccountRequestPage = () => {
  const { users, loadingUsers, errorUsers, sortAsc, sortByName } =
    useUserContext();
  const accountRequestUsers = users.filter((u) => u.status === "PENDING");

  return (
    <div>
      <TableComponent
        title={"Account Registration Requests"}
        sort={"Oldest to Recent"}
        type={"ACCOUNT REQUEST"}
        initialUsers={accountRequestUsers}
        sortAsc={sortAsc}
        sortByName={sortByName}
        loadingUsers={loadingUsers}
        errorUsers={errorUsers}
      />
    </div>
  );
};

export default AccountRequestPage;
