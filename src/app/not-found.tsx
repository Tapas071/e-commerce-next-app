import Link from "next/link";
import { FC } from "react";

const Custom404: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg mb-8">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">
        <div className="text-blue-500 hover:text-blue-700 text-lg font-semibold">
          Go back home
        </div>
      </Link>
    </div>
  );
};

export default Custom404;
