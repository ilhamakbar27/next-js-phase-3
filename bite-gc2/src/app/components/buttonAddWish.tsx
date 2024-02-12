"use client"

import { action } from "../wishlist/action"


const ButtonAddWish = ({data}:{data:string}) => {
  return (
    <>
     <button onClick={()=> action (data)  }  className="relative border-y-1  border-black w-full bg-transparent py-2.5 px-5 text-lg font-medium  uppercase text-black transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-black before:transition-transform before:duration-300 before:content-[''] hover:text-white before:hover:scale-x-100">
            Add to wishlist
          </button>
    </>
  )
}

export default ButtonAddWish