"use server";
import { getUserByEmail } from "@/db/models/user";
import { comparePassword } from "@/db/utils/hash";
import { signToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export const doLogin = async (formData: FormData) => {
  const loginInputSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });
  const email = formData.get("email");
  const password = formData.get("password");

  const parsedData = loginInputSchema.safeParse({
    email,
    password,
  });

  if (!parsedData.success) {
    const errPath = parsedData.error.issues[0].path[0];
    const errMsg = parsedData.error.issues[0].message;
    const errFinalMsg = `${errPath}-${errMsg}`;
    return redirect(`http://localhost:3000/login?error=${errFinalMsg}`);
  }

  const user = await getUserByEmail(parsedData.data.email);

  if (!user || !comparePassword(parsedData.data.password, user.password)) {
    return redirect(`http://localhost:3000/login?error=Invalid%20credentials`);
  }

  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
  };

// Menyimpan token dengan menggunakan cookies
  const token = signToken(payload);
  cookies().set("token",token, {
        // Meng-set cookie agar hanya bisa diakses melalui HTTP(S)
        httpOnly: true,
        // Meng-set cookie agar hanya bisa diakses melalui HTTPS, karena ini hanya untuk development, maka kita akan set false
        secure: false,
        // Meng-set expiration time dari cookies
        expires: new Date(Date.now() + 10000 * 60 * 60), // 10 hour
        // Meng-set cookie agar hanya bisa diakses melalui domain yang sama
        sameSite: "strict",
  });

  return redirect('http://localhost:3000/wishlist')
};
