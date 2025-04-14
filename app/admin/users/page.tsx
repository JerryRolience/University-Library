"use client";

import { TableComponent } from "@/components/admin/users/table/Table";
import { useUserContext } from "@/contexts/UserContext";

const AllUsersPage = () => {
  const { users, loadingUsers, errorUsers, sortAsc, sortByName } =
    useUserContext();

  return (
    <div>
      <TableComponent
        title={"ALL USERS"}
        sort={"A-Z"}
        type={"ALL USERS"}
        initialUsers={users}
        sortAsc={sortAsc}
        sortByName={sortByName}
        loadingUsers={loadingUsers}
        errorUsers={errorUsers}
      />
    </div>
  );
};

export default AllUsersPage;
