// import { access } from "fs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { IoMdExit } from "react-icons/io";
import { actionLogout } from "./actionLogout";

const LogoutButton = () => {
  return (
    <>
      <form
        action={async()=>{
            "use server";
            cookies().get("token") && cookies().delete("token");
            redirect("/login");
        }}>
        <button className="text-3xl flex  font-[300] justify-end items-end">
          <IoMdExit />
        </button>
      </form>
    </>
  );
};

export default LogoutButton;
