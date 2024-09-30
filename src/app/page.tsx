import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" bg-red-900 h-screen min-w-full relative">
      <Navbar />
      <h1>Home</h1>
    </div>
  );
}
