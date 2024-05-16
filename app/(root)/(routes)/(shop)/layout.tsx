import ProductCard from "@/components/ui/Cards/product-card";
import Categories from "@/components/ui/shop/categories";
import Collections from "@/components/ui/shop/collections";
import Featured from "@/components/ui/shop/featured";
import FilterPrice from "@/components/ui/shop/filter-price";
import Link from "next/link";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <section className="w-full h-40 bg-secondary/50 grid place-items-center">
        <h1 className="text-6xl font-light font-karantina flex items-center justify-center flex-col">
          SHOP
          <span className="text-sm text-primary/70 font-normal font-kanit">
            <Link href={"/"}>Home</Link> /{" "}
            <Link className="text-primary" href={"/shop"}>
              Shop
            </Link>
          </span>
        </h1>
      </section>
      <div className="flex gap-5 p-2">
        {/* This is left aside section  */}
        <section className="w-[25%] h-full space-y-3 ">
          <Categories />
          <Collections/>
          <FilterPrice />
          <Featured />
        </section>

        {/* This is Right aside section  */}
        <section className="w-10/12 h-full">
          {/* This is current category banner div */}
          <div className="w-full h-32 bg-secondary/50"></div>
          {/* This is Product Render section  */}
          <div className="w-full grid grid-cols-3 gap-5 mt-5">
            <ProductCard variant="V1" />
            <ProductCard variant="V1" />
            <ProductCard variant="V1" />
            <ProductCard variant="V1" />
            <ProductCard variant="V1" />
            <ProductCard variant="V1" />
          </div>
        </section>
      </div>
      {children}
    </main>
  );
};

export default RootLayout;
