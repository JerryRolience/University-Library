import { TableComponent } from "@/components/admin/users/Table";
import React from "react";

const page = () => {
  return (
    <div>
      <TableComponent title={"ALL USERS"} sort={"A-Z"} type={"ALL USERS"} />
    </div>
  );
};

export default page;
