
import ProductContainer from "@/components/ProductContainer";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { auth } from "@/auth";
import Image from "next/image";

export default async function Home() {
  const session = await auth();

  return (
    <div className="h-screen min-w-full relative">
      <Navbar />
      <div className="">
        <ProductContainer />
      </div>
    </div>
  );
}
