import { createUser, getUsers } from "@/db/models/user";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};
const userInputSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(5),
});
// GET /api/users
export const GET = async (request: NextRequest) => {
  const users = await getUsers();

  console.log("INSIDE GET /api/users");
  console.log("x-user-id", request.headers.get("x-user-id"));
  console.log("x-user-username", request.headers.get("x-user-username"));
  console.log("x-user-email", request.headers.get("x-user-email"));

  return Response.json(
    {
      statusCode: 200,
      message: "Pong from GET /api/users !",
      data: users,
    },
    {
      status: 200,
    }
  );
};
// / POST /api/users
export const POST = async (request: Request) => {
  try {
    const data = await request.json();
    const parsedData = userInputSchema.safeParse(data);
    if (!parsedData.success) {
      throw parsedData.error;
    }
    const user = await createUser(parsedData.data);
    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 201,
        message: "Pong from POST /api/users !",
        data: user,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error);
      const errorPath = error.issues[0].path[0];
      const errorMessage = error.issues[0].message;

      return NextResponse.json<MyResponse<never>>(
        {
          statusCode: 400,
          error: `${errorPath} - ${errorMessage}`,
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json<MyResponse<never>>(
      {
        statusCode: 500,
        message: "Internal server Error!",
      },
      {
        status: 500,
      }
    );
  }
};
