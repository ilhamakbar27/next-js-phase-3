import { BASE_API_URL } from "@/lib/constant";
import { FaStar } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";

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

const fetchProductBySlug = async (slug: string) => {
  const response = await fetch(`${BASE_API_URL}/api/products/${slug}`, {
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Error server...");
  }
  console.log();

  return data.data as ProductsModel
};

const page = async ({ params }: { params: { slug: string } }) => {
  const data = await fetchProductBySlug(params.slug)
  if (!BASE_API_URL) {
    return null;
  }
  return (
    <>
      <section className="h-full bg-[#F9F9F9]">
        <div className="flex pt-32  justify-between">
          <div className="w-[65%] flex flex-col gap-3 px-10">
            <img
              className="object-cover w-[95%] h-[850px]"
              src={data?.thumbnail}
              alt=""
            />
            <div
              className=" size-24 ml-32
             flex mb-5 gap-3">
              {data?.images?.map((img,idx)=>{
                return (
                  <img key={idx} src={img}/>
                )
              })}
            </div>
          </div>
          <div className="w-[45%] flex flex-col  gap-7">
            <h1 className="font-semibold text-6xl w-[80%] -tracking-[4px]">
              {data?.name}
            </h1>
            <h2 className="w-[70%]">
             {data?.description}
            </h2>
            <div className="flex ">
              <div className="gap-1 pt-[1px] flex text-xl ">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <div className="pl-5 text-md">
                <h3 className="text-center text-md">{data?.excerpt}</h3>
              </div>
            </div>
            <div className="flex px-5 text-lg justify-start font-thin w-full tracking-tight flex-col gap-3">
              <p className="flex gap-2">
                •
                <span className="bg-[#72F2C6]">
                  Easy to use, best-selling toothpaste alternative
                </span>
              </p>
              <p className="flex gap-2">
                •
                <span className="bg-[#72F2C6]">
                  TSA approved and trusted by dentists
                </span>
              </p>
              <p className="flex gap-2">
                •
                <span className="bg-[#72F2C6]">
                  Crafted without harsh chemicals or plastics
                </span>
              </p>
              <p className="flex gap-2">
                •{" "}
                <span className="bg-[#72F2C6]">
                  Environmentally friendly packaging
                </span>
              </p>
            </div>
            <h2>FLAVOR: {data?.tag}</h2>
            <div className="px-5 w-[80%] py-5 border border-gray-700 ">
              <div className="flex justify-between">
                <div className="flex text-sm flex-col gap-1">
                  <h1 className="flex gap-2">
                    {" "}
                    <span className="pt-[3px]">
                      <FaCheck />
                    </span>{" "}
                    Subscribe and save
                  </h1>
                  <h1 className="flex gap-2">
                    {" "}
                    <span className="pt-[3px]">
                      <FaCheck />
                    </span>
                    Ships free
                  </h1>
                  <h1 className="flex gap-2">
                    {" "}
                    <span className="pt-[3px]">
                      <FaCheck />
                    </span>
                    Pause and cancel everytime
                  </h1>
                </div>
                <div>
                  <p className="text-md font-[300]">${data?.price}/Month</p>
                </div>
              </div>
            </div>
            <button
              className="bg-black w-[80%] transition-all duration-200 ease-out hover:border-gray-700 hover:bg-white hover:text-black hover:border uppercase text-lg  text-white font-[400] py-3 px-4 focus:outline-none focus:shadow-outline"
              type="submit">
              Add to wishlist
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
