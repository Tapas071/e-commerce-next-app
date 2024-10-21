
import ProductContainer from "@/components/ProductContainer";
import Navbar from "@/components/shared/Navbar";
import { auth } from "@/auth";
import Slideshow from "@/components/SlideShowHome";
import CartItemCount from "@/components/CartitemsNumber";

export default async function Home() {
  const session = await auth();

  return (
    <div className="h-screen min-w-full">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      {/* Slideshow Section */}
    <Slideshow/>
      {/* Product Section */}
      <div className="pt-16">
        <ProductContainer />
        
      </div>
    </div>
  );
}