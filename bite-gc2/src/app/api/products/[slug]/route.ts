import { getProductBySlug } from "@/db/models/products";
import { NextRequest, NextResponse } from "next/server";

type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

export const GET = async (
  _request: NextRequest,
  { params }: { params: { slug: string } }
) => {
  const slug = params.slug;
  const product = await getProductBySlug(slug);
  return NextResponse.json<MyResponse<unknown>>({
    statusCode: 200,
    message: `Pong from GET /api/products/${slug} !`,
    data: product,
  });
};
