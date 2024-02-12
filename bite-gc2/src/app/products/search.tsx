"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

const Search = ({ search }: { search?: string }) => {
  const router = useRouter();
  const [text, setText] = useState(search);
  const initialRender = useRef(true);

  const [query] = useDebounce(text, 500);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (!query) {
      router.push("/products");
    } else {
      router.push(`products/?search=${query}`);
    }
  }, [router, query]);

  return (
    <form className="flex pt-10 justify-center items-center">
      <input
        placeholder="search your product here.."
        type="text"
        value={text}
        className="w-[70%] px-5  border border-gray-500 h-14"
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  );
};

export default Search;
