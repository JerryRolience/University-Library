import { TableComponent } from "@/components/admin/users/Table";
import React from "react";

const page = () => {
  return (
    <div>
      <TableComponent
        title={"Account Registration Requests"}
        sort={"Oldest to Recent"}
        type={"ACCOUNT REQUEST"}
      />
    </div>
  );
};

export default page;
