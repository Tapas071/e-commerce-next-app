
import ProductContainer from "@/components/ProductContainer";
import Navbar from "@/components/shared/Navbar";
import { auth } from "@/auth";

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
