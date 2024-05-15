import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = () => {
  return (
    <div className="md:min-w-52 aspect-[3/4] overflow-hidden border p-2 hover:border-slate-300 relative bg-white">
      <Link
        href={"/"}
        className="w-full h-full flex flex-col justify-between gap-2"
      >
        <div className="h-3/4 overflow-hidden">
          <Image
            src="/temp-assets/temp-product1.png"
            alt="product-image"
            className="bg-secondary/50 object-cover "
            width={300}
            height={300}
          />
        </div>
        <div>
          <h1 className="text-xl text-nowrap overflow-hidden text-ellipsis md:w-52 w-40 truncate">Nike Air Max Plus 3</h1>
          <h2 className="text-base text-primary/50 text-nowrap">Basketball Shoes</h2>
          <h3 className="text-lg text-nowrap">Rs. 1,999</h3>
        </div>
      </Link>
      <span className="text-sm text-white bg-accent absolute top-0 right-0 p-1 px-2">In stock</span>
    </div>
  );
};

export default ProductCard;
