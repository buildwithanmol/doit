import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductCardProps {
  variant: string;
}
const ProductCard = ({ variant = "V1" }: ProductCardProps) => {
  return (
    <div
      className={clsx(
        variant == "V1" ? "md:min-w-52 aspect-[3/4] " : "w-full min-h-10",
        "overflow-hidden border p-2 hover:border-slate-300 relative bg-white"
      )}
    >
      <Link
        href={"/"}
        className={clsx(
          variant == "V1" ? "flex-col" : "flex-row",
          "w-full h-full flex  flex-row justify-between gap-2"
        )}
      >
        <div
          className={clsx(
            variant === "V1" ? "h-3/4 " : "aspect-square",
            "overflow-hidden"
          )}
        >
          <Image
            src="/temp-assets/temp-product1.png"
            alt="product-image"
            className="bg-secondary/50 object-cover "
            width={300}
            height={300}
          />
        </div>
        <div className={clsx(variant !== "V1" && "w-[60%]")}>
          <h1
            className={clsx(
              variant === "V1" ? "text-xl md:w-52 w-40" : "text-sm ",
              "text-nowrap overflow-hidden text-ellipsis truncate"
            )}
          >
            Nike Air Max Plus 3
          </h1>
          <h2
            className={clsx(
              variant === "V1" ? "text-base" : "text-xs ",
              "text-nowrap overflow-hidden text-ellipsis text-primary/50"
            )}
          >
            Basketball Shoes
          </h2>
          <h3
            className={clsx(
              variant === "V1" ? "text-lg " : "text-xs ",
              "text-nowrap"
            )}
          >
            Rs. 1,999
          </h3>
        </div>
      </Link>
      <span
        className={clsx(
          variant === "V1" ? "p-1 px-2 top-0 " : " px-1 bottom-0 ",
          "bg-accent text-white absolute  right-0 text-sm  "
        )}
      >
        In stock
      </span>
    </div>
  );
};

export default ProductCard;
