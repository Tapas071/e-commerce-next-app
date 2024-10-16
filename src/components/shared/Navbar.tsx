// "use client"
import { useState } from "react";
import { FaHome, FaShoppingCart, FaUser, FaSignOutAlt } from "react-icons/fa"; // Sample icons from react-icons
import { RiAdminFill } from "react-icons/ri";
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

  return (
    <nav className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
      <Link className="flex items-center" href={"/"}>
        <div className="text-lg font-bold">FlaxBazar</div>
      </Link>

      {/* <ul className={`flex space-x-4 ${isOpen ? "block" : "hidden"} md:flex`}> */}
      <ul className={`flex space-x-4 ${true ? "block" : "hidden"} md:flex`}>
        <li>
          <Link className="flex items-center" href={"/"}>
            <FaHome className="mr-1" /> Home
          </Link>
        </li>

        <li>
          <Link className="flex items-center" href={"/cart"}>
            <FaShoppingCart className="mr-1" /> Cart
          </Link>
        </li>
        <li>
          <Link className="flex items-center" href={"/profile"}>
            <FaUser className="mr-1" /> Profile
          </Link>
        </li>
        <li>
          {isAdmin ? (
            <Link className="flex items-center" href="/admin">
              <RiAdminFill className="mr-1" />
              Admin Dashboard
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
