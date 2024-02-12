import { getUserById } from "@/db/models/user";
import { NextRequest, NextResponse } from "next/server";

type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

export const GET = async (
  _request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = params.id;
  const user = await getUserById(id);
  return NextResponse.json<MyResponse<unknown>>({
    statusCode: 200,
    message: `Pong from GET /api/users/${id} !`,
    data: user,
  });
};
