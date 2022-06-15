import React from "react";
import CountrySelector from "./CountrySelector";
import Navigation from "./Navigation.client";
import { Link } from "@shopify/hydrogen";
import CartIcon from "./CartIcon";
const Header = () => {
  return (
    <>
      <header className="h-20 lg:h-32 text-gray-700" role="banner">
        <div className="fixed z-20 h-20 lg:h-32 w-full border-b border-gray-200 px-6 md:px-8 md:py-6 lg:pt-8 lg:pb-0 mx-auto bg-white ">
          <div className="h-full flex lg:flex-col place-content-between">
            <div className="text-center w-full flex justify-between items-center">
              <CountrySelector />
              <Link
                className="font-black uppercase text-3xl tracking-widest"
                to="/"
              >
                Your Store
              </Link>

              <div className="hover:opacity-80 cursor-pointer">
                <CartIcon />
              </div>
            </div>
            <Navigation />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
