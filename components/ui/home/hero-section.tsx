import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <section className="w-full bg-white flex flex-col md:flex-row md:max-h-[screen] border-b">
      <div className="w-full md:w-2/5  p-4 px-6 space-y-2">
        <h2 className="text-8xl text-primary font-karantina font-light">
          WearIt <br /> Self Lacing <br /> Shoes
        </h2>
        <p className="text-base">
          A breakthrough lacing system that adjusts to the shape of your foot
        </p>
        <h3 className="text-6xl font-light font-karantina text-primary/80">
          Rs. 1,999
        </h3>
        <button className="px-6 p-2 bg-accent text-white">
          <Link href={"/"}>Buy Now</Link>
        </button>
      </div>
      <div className="w-full md:w-[60%] min-h-40  bg-secondary/50"></div>
    </section>
  );
};

export default HeroSection;
