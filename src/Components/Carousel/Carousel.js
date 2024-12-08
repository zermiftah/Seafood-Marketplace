import React, { useState,useEffect } from "react";
import "tailwindcss/tailwind.css";
import Carousel1 from "../../Assets/img/CarouselPhoto1.webp";
import Carousel3 from "../../Assets/img/CarouselPhoto3.webp";

const Carousel = () => {
  const images = [
    Carousel1, 
    Carousel3,
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId); 
  }, [images.length]);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div
    className="relative py-6 sm:py-6 xl:mx-auto xl:max-w-7xl xl:px-8"
    onMouseEnter={() => setIsHovered(true)}  
    onMouseLeave={() => setIsHovered(false)} 
  >
    <div className="relative h-56 overflow-hidden rounded-lg md:h-96 shadow-xl border border-gray-300 bg-gradient-to-r from-blue-400 via-green-400 to-blue-500">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-200 ease-linear ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`}
        >
          <img
            src={image}
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="Carousel Slide"
          />
        </div>
      ))}
    </div>
    {isHovered && (  
      <>
        <button
          type="button"
          className="absolute top-1/2 left-4 z-30 flex items-center justify-center w-10 h-10 -translate-y-1/2 rounded-full bg-white/40 shadow-md group hover:bg-white/70 focus:ring-4 focus:ring-white focus:outline-none"
          onClick={handlePrev}
        >
          <svg
            className="w-6 h-6 text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </button>
        <button
          type="button"
          className="absolute top-1/2 right-4 z-30 flex items-center justify-center w-10 h-10 -translate-y-1/2 rounded-full bg-white/40 shadow-md group hover:bg-white/70 focus:ring-4 focus:ring-white focus:outline-none"
          onClick={handleNext}
        >
          <svg
            className="w-6 h-6 text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </button>
      </>
    )}
  </div>
  );
};

export default Carousel;
