"use client"
import { useState } from "react";
import { FaHome, FaShoppingCart, FaUser, FaSignOutAlt } from "react-icons/fa"; // Sample icons from react-icons
import { Button } from "../ui/button";
import { logoutUser, logoutUserFromServer } from "@/lib/actions/auth.action";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const handleLogout = async () => {
      try {
        const result = (await logoutUserFromServer()) as {
          success: boolean;
          message?: string;
        };
        if (result.success) {
          router.push("/login");
        } else {
          console.error("An error occurred during logout:", result.message);
        }
      } catch (error) {
        console.error("An error occurred during logout", error);
      }
    };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
      <div className="text-lg font-bold">FlaxBazar</div>
      <ul className={`flex space-x-4 ${isOpen ? "block" : "hidden"} md:flex`}>
        <li>
          <a href="/" className="flex items-center">
            <FaHome className="mr-1" /> Home
          </a>
        </li>
        <li>
          <a href="/shop" className="flex items-center">
            <FaShoppingCart className="mr-1" /> Shop
          </a>
        </li>
        <li>
          <a href="/profile" className="flex items-center">
            <FaUser className="mr-1" /> Profile
          </a>
        </li>
      </ul>
      <div className="hidden md:block">
        <Button
          variant="outline"
          className=" primary-foreground  bg-secondary-foreground flex items-center"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="mr-1" /> Logout
        </Button>
      </div>
      <button onClick={toggleMenu} className="md:hidden">
        Menu
      </button>
    </nav>
  );
};
export default Navbar;
