import { getProducts } from "@/db/models/products";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

type ProductsModel = {
    _id: ObjectId
    name: string;
    slug: string;
    excerpt: string;
    description: string;
    price: number;
    tag: [string];
    thumbnail: string;
    images: [string];
  };

export const GET = async (request: NextRequest) => {
  const search = request.nextUrl.searchParams.get("search");
  const page = request.nextUrl.searchParams.get("page");

  const products = await getProducts(search,Number(page));
  return NextResponse.json<MyResponse<ProductsModel[]>>(
    {
      statusCode: 200,
      message: "Pong from GET /api/products !",
      data: products 
    },
    {
      status: 200,
    }
  );
};
