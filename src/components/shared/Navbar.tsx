// "use client"
import { useState } from "react";
import { FaHome, FaShoppingCart, FaUser, FaSignOutAlt } from "react-icons/fa"; // Sample icons from react-icons
import { Button } from "../ui/button";
import { logoutUser, logoutUserFromServer, userInformation } from "@/lib/actions/auth.action";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";
import { SessionData } from "@/types";

const Navbar = async () => {
    // const [isOpen, setIsOpen] = useState(false);
      const session: SessionData | null = await auth();
      let isAdmin = false;
    if(session){
        if (session.user) {
          const email = session.user.email;
          if (email) {
          const userData = await userInformation({ email });
          if(userData.user){
            if(userData.user.isAdmin === true){
              isAdmin = true;
            }

          }
        }
    }
  }

  

  // const toggleMenu = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <nav className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
      <div className="text-lg font-bold">FlaxBazar</div>
      {/* <ul className={`flex space-x-4 ${isOpen ? "block" : "hidden"} md:flex`}> */}
      <ul className={`flex space-x-4 ${true ? "block" : "hidden"} md:flex`}>
        <li>
          <a href="/" className="flex items-center">
            <FaHome className="mr-1" /> Home
          </a>
        </li>
        <li>
          <a href="/cart" className="flex items-center">
            <FaShoppingCart className="mr-1" /> Cart
          </a>
        </li>
        <li>
          <a href="/profile" className="flex items-center">
            <FaUser className="mr-1" /> Profile
          </a>
        </li>
        <li>
          {isAdmin ? (
            <Link href="/admin">
              <div className="flex items-center">Admin Dashboard</div>
            </Link>
          ) : null}
        </li>
      </ul>
      <div className="hidden md:block">
        {session ? <LogoutButton /> : <LoginButton />}
      </div>
    </nav>
  );
};
export default Navbar;
