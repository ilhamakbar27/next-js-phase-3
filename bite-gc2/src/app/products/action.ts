"use server"

import { BASE_API_URL } from "@/lib/constant";



export type ProductsModel = {
    _id: string;
    name: string;
    slug: string;
    excerpt: string;
    description: string;
    price: number;
    tag: [string];
    thumbnail: string;
    images: [string];
  };
  
  export const fetchProducts = async ({
    search,
    page,
  }: {
    search?: string;
    page?: number;
  }) => {
    if (!search) {
      search = "";
    }
    if (!page) {
      page = 1;
    }
    const response = await fetch(
      `${BASE_API_URL}/api/products?search=${search}&page=${page}`
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Error server...");
    }
    if (!BASE_API_URL) {
      return null;
    }
    return data.data as ProductsModel[];
  };