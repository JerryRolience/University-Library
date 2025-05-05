import Image from "next/image";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <main className="auth-container">{children}</main>;
};

export default layout;
