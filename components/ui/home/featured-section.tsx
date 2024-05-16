import React from "react";
import ProductCard from "../Cards/product-card";
import FeaturedCarousel from "./featured-carousel";

const FeaturedSection = () => {
  let carouselData = [
    {
      title: "carousel1",
      element: <ProductCard variant="V1"/>,
    },
    {
      title: "carousel2",
      element: <ProductCard variant="V1"/>,
    },
    {
      title: "carousel3",
      element: <ProductCard variant="V1"/>,
    },
    {
      title: "carousel4",
      element: <ProductCard variant="V1"/>,
    },
  ];
  return (
    <section className="md:h-96 w-full flex md:flex-row  flex-col-reverse">
      <div className="w-full md:w-[40%] h-full min-h-40 bg-secondary/50"></div>
      <div className="w-full md:w-[60%]">
        <FeaturedCarousel carouselData={carouselData} />
      </div>
    </section>
  );
};

export default FeaturedSection;
