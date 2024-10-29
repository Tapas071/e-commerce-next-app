// components/shared/Slideshow.tsx
"use client";

import { useState, useEffect } from "react";

interface Discount {
  id: number;
  title: string;
  description: string;
  image: string;
}

const discounts: Discount[] = [
  {
    id: 1,
    title: "50% OFF",
    description: "On all electronics",
    image: "/images/discount1.jpg",
  },
  {
    id: 2,
    title: "Buy 1 Get 1",
    description: "On clothing items",
    image: "/images/discount2.jpg",
  },
  {
    id: 3,
    title: "30% OFF",
    description: "On groceries",
    image: "/images/discount3.jpg",
  },
];

export default function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically rotate slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % discounts.length);
    }, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
      {discounts.map((discount, index) => (
        <div
          key={discount.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* <img
            src={discount.image}
            alt={discount.title}
            className="w-full h-full object-cover"
          /> */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center p-4">
            <h2 className="text-4xl md:text-6xl font-bold">{discount.title}</h2>
            <p className="mt-4 text-lg md:text-2xl">{discount.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
