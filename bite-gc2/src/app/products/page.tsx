
import { BASE_API_URL } from "@/lib/constant";
import Products from "./products";
import Search from "./search";
export const dynamic = 'force-dynamic'

type ProductsModel = {
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

const fetchProducts = async ({
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
  return data.data as ProductsModel[];
};

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const products = await fetchProducts({ page, search });
  if (!BASE_API_URL) {
    return null;
  }
  return (
    <>
      <section className="pt-32 px-20 h-full pb-24 ">
        <h1 className="text-center font-[300] tracking-tighter text-5xl">
          Shop your plastic-free routine.
        </h1>
        <Search search={search} />

        {search && products.length === 0 ? (
          <div className="flex justify-center h-[70vh] items-center">
            <h1 className=" mt-20 text-4xl font-semibold text-gray-400">
              No products found.
            </h1>
          </div>
        ) : (
          <Products search={search} initialProduct={products} />
        )}
      </section>
    </>
  );
};

export default page;
