import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// import React from 'react'

const ServerProtectedComponents = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (!token || token.value.length <= 0) {
    redirect("/login");
  }

  return <>{children}</>;
};

export default ServerProtectedComponents;
