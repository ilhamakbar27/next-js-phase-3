import Link from "next/link";
import { doLogin } from "./action";
import Flash from "../components/ClientFlash";

const Login = () => {
  return (
    <>
      <div className="min-h-screen pt-10 flex items-center justify-center    bg-gray-100">
        <div className="max-w-xl px-10 w-full border border-gray-300 mx-auto py-10 shadow-lg">
          <h1 className="text-5xl font-bold  tracking-tight mb-10">Login</h1>
          <form action={doLogin}>
            <div className="pb-5">
              <Flash />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email">
                Email:
              </label>
              <input
                className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                type="email"
                id="email"
                name="email"
                placeholder="Your email..."
                //   value={email}

                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password">
                Password:
              </label>
              <input
                className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                type="password"
                id="password"
                name="password"
                placeholder="Your password..."
                //   value={password}
                //   onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="flex items-center flex-col gap-5 pt-3 justify-center">
              <button
                className="bg-black w-full transition-all duration-200 ease-out hover:border-gray-700 hover:bg-white hover:text-black hover:border uppercase text-lg  text-white font-[400] py-3 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit">
                Login
              </button>
              <Link
                href={"/register"}
                className=" pt-1 tracking-wide text-center hover:underline font-semibold text-lg ">
                Not signed in yet just register...
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
