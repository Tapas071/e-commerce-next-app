import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';
import { FaSignOutAlt } from 'react-icons/fa';

const LoginButton = () => {
  return (
    <div>
      {" "}
      <Link href={"/login"}>
        <Button
          variant="outline"
          className=" primary-foreground  bg-secondary-foreground flex items-center"
        >
          <FaSignOutAlt className="mr-1" /> login
        </Button>
      </Link>
    </div>
  );
}

export default LoginButton