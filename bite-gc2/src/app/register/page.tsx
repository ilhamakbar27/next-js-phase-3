import Link from "next/link";
import Flash from "../components/ClientFlash";
import { redirect } from "next/navigation";

// const RegisterPage = () => {};

const Register = () => {
  const handleFormAction = async (formData: FormData) => {
    "use server";

    type MyResponse<T> = {
      statusCode: number;
      message?: string;
      data?: T;
      error?: string;
    };

    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      body: JSON.stringify({
        username: formData.get("username"),
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseJson: MyResponse<unknown> = await response.json();
    // !! WARNING: Bila menggunakan redirect, tidak boleh menggunakan try-catch block. Hal ini dikarenakan di dalam NextJS, redirect akan meng-throw error bernama "NEXT_REDIRECT"
    if (!response.ok) {
      console.log("masuk ke register");
      let message = responseJson.error ?? "Something went wrong!";
      // Harapannya di sini adalah ketika ada error, maka kita akan redirect ke halaman register dengan URLSearchParams dengan key "error" yang berisi pesan errornya, dengan asumsi bahwa error SELALU string
      return redirect(`/register?error=${message}`);
    }

    return redirect(`/login`);
  };

  return (
    <>
      <div className="min-h-full flex items-center justify-center  pt-32 pb-24   bg-gray-100">
        <div className="max-w-2xl px-10 w-full border border-gray-300 mx-auto py-10 shadow-lg">
          <h1 className="text-5xl font-bold  tracking-tight mb-10">Register</h1>
          <div className="pb-5 w-full">
            <Flash />
          </div>
          <form action={handleFormAction}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email">
                Username:
              </label>
              <input
                className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                type="username"
                id="username"
                name="username"
                placeholder="Username"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name">
                Name:
              </label>
              <input
                className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                type="name"
                id="name"
                name="name"
                placeholder="name"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password">
                Email:
              </label>
              <input
                className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
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
                placeholder="Password"
                required
              />
            </div>
            <div className="flex gap-5 flex-col items-center pt-4 justify-center">
              <button
                className="bg-black w-full transition-all duration-200 ease-out hover:border-gray-700 hover:bg-white hover:text-black hover:border uppercase text-lg  text-white font-[400] py-3 px-4 focus:outline-none focus:shadow-outline"
                type="submit">
                Register
              </button>
              <Link
                href={"/login"}
                className=" pt-1 tracking-wide text-center hover:underline font-semibold text-lg ">
                Already signed up just login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
