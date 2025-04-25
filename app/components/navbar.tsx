import Link from "next/link";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-center px-8 py-4 bg-gray-200 text-gray-800 shadow-lg">
      <Link href="/" legacyBehavior>
        <h1 className="text-xl font-bold cursor-pointer hover:text-gray-600">
          ELIABEART
        </h1>
      </Link>
    </nav>
  );
};

export default Navbar;
