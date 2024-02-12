import { cookies } from "next/headers";
import Link from "../../node_modules/next/link";
import Card from "./components/Card";


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

const fetchProducts = async () => {
  const response = await fetch("http://localhost:3000/api/products", {
    headers: {
      Cookie: cookies().toString(),
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Error server...");
  }
  const limitedData = data.data.slice(0, 4);
  return limitedData as ProductsModel[]
};

const Home = async () => {
  const products =  await fetchProducts()
  const backgroundStyle = {
    backgroundImage:
      'url("https://bitetoothpastebits.com/cdn/shop/files/hp-home-hero-desktop-1_2808x.jpg?v=1705612565")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
  };
  return (
    <>
      <section style={backgroundStyle} className="h-screen">
        <div className="pt-52 px-20 justify-center flex flex-col gap-10 w-[50%]">
          <h1 className="text-7xl  tracking-tighter font-semibold  w-[80%]">
            A better way to brush your teeth.
          </h1>

          <h3 className="w-1/2 font-[300] text-lg ">
            Toothpaste Bits without the plastic tubes or harsh chemicals that
            actually work.
          </h3>
          <div className="pt-2">
            <Link
              href={"/products"}
              className="bg-black uppercase py-3 flex  w-4/6 hover:text-black hover:bg-white transition-all hover:duration-300 duration-200 text-center justify-center items-center text-lg text-white tracking-widest ">
              Buy now
            </Link>

          </div>
        </div>
        {/* <div className="pt-10">
        <img className="bg-cover  w-[2000px] h-full" src="/logos.png" alt="" />
      </div> */}
      </section>
      <section className="pt-16 bg-[#F8F8F8] flex flex-col gap-10 px-10 pb-24">
        <h1 className="font-semibold text-5xl text-center tracking-tight">
          Featured Product
        </h1>
        <Link
          href={"/products"}
          className="text-right  hover:text-green-500  transition-all duration-100 ease-in-out text-2xl tracking-wide  font-semibold ">
          See all
        </Link>
        <div className="grid justify-center items-center h-full pt-2 gap-2 w-full grid-cols-4">
          {products?.map((prod,idx)=>{
            return (
              <Card key={idx} data={prod} />
            )
          })}
        </div>
      </section>
    </>
  );
};

export default Home;
