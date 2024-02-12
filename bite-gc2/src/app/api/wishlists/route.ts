import { createWishlist, getWishlists } from "@/db/models/wishlist";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { date, z } from "zod";

type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

const wishlistInputSchema = z.object({
  userId: z.string(),
  productId: z.string(),
  createdAt: z.date().optional(),
  updatedAt : z.date().optional()

});

export const GET = async (request: NextRequest) => {
  const wishlists = await getWishlists();

  console.log("INSIDE GET /api/wishlist");
  console.log("x-user-id", request.headers.get("x-user-id"));
  return Response.json(
    {
      statusCode: 200,
      message: "Pong from GET /api/wishlist !",
      data: wishlists,
    },
    {
      status: 200,
    }
  );
};

export const POST = async (request: NextRequest) => {
  try {
    const wishlists = await request.json();
    console.log(wishlists);
    wishlists.userId= request.headers.get("x-user-id") 
    const parsedData = wishlistInputSchema.safeParse(wishlists);
    if (!parsedData.success) {
      throw parsedData.error;
    }

    const data = await createWishlist({
      userId: new ObjectId(parsedData.data.userId),
      productId: new ObjectId(parsedData.data.productId),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("INSIDE GET /api/wishlist");
    console.log("x-user-id", request.headers.get("x-user-id"));

    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 200,
        message: "sucess add wishlist",
        data: data
      },
      {
        status: 200,
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
    
  }

