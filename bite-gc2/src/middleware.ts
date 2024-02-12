import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyTokenJose } from "./lib/jwt";

export const middleware = async (request: NextRequest) => {
  if (
    !request.url.includes("/api") &&
    !request.url.includes("_next/static") &&
    !request.url.includes("_next/image") &&
    !request.url.includes("favicon.ico")
  ) {
  }

  if (request.url.includes("/api/wishlists")) {
    console.log("API", request.method, request.url);
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    console.log("token dari cookiestore", token);

    if (!token) {
      return NextResponse.json({
        statusCode: 401,
        error: "Unauthorized",
      });
    }
    const tokenData = await verifyTokenJose<{
      id: string;
      username: string;
      email: string;
    }>(token.value);

    console.log(tokenData);

    const requestHeaders = new Headers(request.headers);

    requestHeaders.set("x-user-id", tokenData.id);
    requestHeaders.set("x-user-username", tokenData.username);
    requestHeaders.set("x-user-email", tokenData.email);

    console.log(requestHeaders, "<<<<<<<HEADERS");

    return NextResponse.next({
      headers: requestHeaders,
    });
    // Jangan lupa untuk meng-"sliding" supaya request bisa dilanjutkan ke handler berikutnya dengan menggunakan "next()"
  }
  return NextResponse.next();
};
