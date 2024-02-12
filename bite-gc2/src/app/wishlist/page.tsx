// "use client"
import React from "react";
import Card from "../components/Card";
import ServerProtectedComponents from "@/components/serverProtectedComponents";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { BASE_API_URL } from "@/lib/constant";



type NewWishlistModel = {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  result: ProductsModel[]
};



type ProductsModel = {
  _id: ObjectId;
  name: string;
  slug: string;
  excerpt: string;
  description: string;
  price: number;
  tag: [string];
  thumbnail: string;
  images: [string];
};

const fetchData = async () => {
  const response = await fetch(`${BASE_API_URL}/api/wishlists`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
  });
  const data = await response.json();
  console.log(data.data, "ini dataaa");
  return data.data as NewWishlistModel[]
};

const page = async () => {
  const wishlists = await fetchData();
  if (!BASE_API_URL) {
    return null;
  }
  return (
    <ServerProtectedComponents>
      <div className="h-full px-20 pb-40 pt-32">
        <h1 className="font-semibold text-5xl tracking-tight ">Wishlist</h1>
        <div className="grid grid-cols-4 gap-5 pt-10">
          {wishlists?.map((prod, idx) => {
            return <Card key={idx} data={prod.result[0]} />;
          })}
        </div>
      </div>
    </ServerProtectedComponents>
  );
};

export default page;
