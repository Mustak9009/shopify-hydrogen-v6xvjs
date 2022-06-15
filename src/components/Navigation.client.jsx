import React from "react";
import { Link } from "@shopify/hydrogen";
const Navigation = () => {
  return (
    <>
      <nav className="hidden lg:block text-center">
        <ul className="md:flex items-center justify-center pl-14">
          <li>
            {" "}
            <Link className="block p-4 hover:opacity-80" to="/">
              Freestyle
            </Link>{" "}
          </li>
          <li>
            {" "}
            <Link className="block p-4 hover:opacity-80" to="/">
              Backcountry
            </Link>{" "}
          </li>
          <li>
            {" "}
            <Link className="block p-4 hover:opacity-80" to="/">
              Thermals and Layers
            </Link>{" "}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
