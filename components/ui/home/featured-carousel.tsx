"use client";
import React, { useRef, useCallback, useState, useEffect } from "react";
import { IoCaretForwardCircleOutline } from "react-icons/io5";
import { PiDotOutlineFill } from "react-icons/pi";

interface CarouselItem {
  element: React.ReactNode;
}

interface CustomCarouselProps {
  carouselData: CarouselItem[];
}

const FeaturedCarousel: React.FC<CustomCarouselProps> = ({ carouselData }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const divCount = carouselData.length; // Number of divs in the CustomCarousel

  const handlePrev = useCallback(() => {
    if (currentIndex === 0) return;
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left:
          containerRef.current.scrollLeft - containerRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? divCount - 1 : prevIndex - 1
    );
  }, [currentIndex, divCount]);

  const handleNext = useCallback(() => {
    if (currentIndex === divCount - 1) return;
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left:
          containerRef.current.scrollLeft + containerRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
    setCurrentIndex((prevIndex) =>
      prevIndex === divCount - 1 ? 0 : prevIndex + 1
    );
  }, [currentIndex, divCount]);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPosition = containerRef.current.scrollLeft;
        const scrollWidth =
          containerRef.current.scrollWidth - containerRef.current.offsetWidth;
        const index = Math.round(
          (scrollPosition / scrollWidth) * (divCount - 1)
        );
        setCurrentIndex(index);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [divCount]);

  return (
    <main className="relative w-full h-full p-2">
      <button
        onClick={handlePrev}
        className="absolute left-3 z-10 rotate-180 top-1/2 -translate-y-1/2 text-4xl text-accent hover:text-accent/50"
      >
        <IoCaretForwardCircleOutline />
      </button>

      <section
        ref={containerRef}
        className="overflow-hidden h-full w-full overflow-x-scroll flex flex-nowrap snap-mandatory snap-x scroll-smooth gap-3 [&::-webkit-scrollbar]:hidden rounded-xl [scrollbar-width:none]"
      >
        {carouselData.map((item, index) => (
          <div
            key={index}
            className=" h-full snap-center flex items-center object-contain justify-center"
          >
            {item.element}
          </div>
        ))}
      </section>

      <button
        onClick={handleNext}
        className="absolute right-3 z-10 top-1/2 -translate-y-1/2 text-4xl text-accent hover:text-accent/50"
      >
        <IoCaretForwardCircleOutline />
      </button>
      <span className="flex items-center z-10 text-xl justify-center absolute left-1/2 transform -translate-x-1/2 bottom-0">
        {carouselData.map((_, index) => (
          <PiDotOutlineFill
            key={index}
            className="text-accent/50"
            style={{ color: currentIndex === index ? "#E1FE02" : undefined }}
          />
        ))}
      </span>
    </main>
  );
};

export default FeaturedCarousel;
