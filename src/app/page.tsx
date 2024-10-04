
import ProductContainer from "@/components/ProductContainer";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { auth } from "@/auth";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  if(!session) {
    return <div className=" "> authenticated</div>
    // <div className=" "> not authenticated</div>
  }

  return (
    <div className="h-screen min-w-full relative">
      <Navbar />
      <div className="bg-red-400 ">
        {/* <ProductContainer /> */}
      </div>
    </div>
  );
}
