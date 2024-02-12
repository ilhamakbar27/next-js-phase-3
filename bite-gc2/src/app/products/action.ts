"use server"


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
      `http://localhost:3000/api/products?search=${search}&page=${page}`
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Error server...");
    }
    return data.data as ProductsModel[];
  };