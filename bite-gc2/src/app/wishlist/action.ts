"use server"

// import { createWishlist } from "@/db/models/wishlist";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type WishlistModel = {
  _id: string;
  userId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
};
export const action = async (data:string) => {
    console.log(data);
    
  const response = await fetch(`http://localhost:3000/api/wishlists`,{
    method: "POST",
    body: JSON.stringify({
      productId: data,
    }),
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
    credentials: "include",
  });
  const datas = await response.json();
  console.log(datas, "datatbhwbhsjfw");
  
  if (!response.ok) {
    throw new Error("Error server...");
  }
  redirect("/wishlist")
//   return datas.data as WishlistModel[];
};
