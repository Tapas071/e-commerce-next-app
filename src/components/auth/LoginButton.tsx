import Link from 'next/link';
import React from 'react'

import { FaSignOutAlt } from 'react-icons/fa';
import { Button } from '../ui/button';

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