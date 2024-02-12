import Image from "next/image";
import Link from "next/link";
import { IoBagAdd } from "react-icons/io5";
import ButtonAddWish from "./buttonAddWish";

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

const Card = ({ data }: { data: ProductsModel }) => {
  return (
    <>
      <div className="border border-0.6  hover:scale-95 transition-all duration-200 hover:ease-in-out border-gray-300">
        <div className="flex gap-1  justify-between">
          <h1 className="pt-4 w-[70%] text-xl font-[300] uppercase px-5">
            {data?.name}
          </h1>
          <div className="text-center w-[25%] hover:text-green-600 transition-all duration-200  text-3xl flex justify-center items-center">
            <IoBagAdd />
          </div>
        </div>
        <p className="font-thin pt-2 px-5 text-sm">From ${data?.price}/month</p>
        <div className="flex flex-col justify-between">
          <Link href={`/products/${data?.slug}`}>
            <img
              className="object-cover"
              src={data?.thumbnail}
              alt="picture of bites"
            />
          </Link>
          <ButtonAddWish data={data._id} />
        </div>
      </div>
    </>
  );
};

export default Card;
