"use client";
import ProductContainer from "@/components/ProductContainer";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen min-w-full relative">
      <Navbar />
      <div className="bg-red-400 ">
        <ProductContainer/>
      </div>
      
    </div>
  );
}
