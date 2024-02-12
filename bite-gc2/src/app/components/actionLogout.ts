"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const actionLogout = () => {
  const cookieStore = cookies()
  cookieStore.get("token")?.value && cookieStore.delete("token")
  redirect("/login");
};
