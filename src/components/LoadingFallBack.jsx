import React from "react";
import OpenIcon from "./OpenIcon";
import CartIcon from "./CartIcon";
const LoadingFallBack = () => {
  return (
    <>
      <header className="h-20 lg:h-28 max-w-screen text-gray-700">
        <div className="border-2 fixed  w-full lg:h-28 bg-white/90 border-b border-black border-opacity-10 px-6 md:px-8 md:py-6 lg:pt-8 lg:pb-0 mx-auto p-3 md:p-0">
          <div className="h-full flex lg:flex-col place-content-between">
            <div className="text-center w-full flex justify-between items-center">
              <div className="hidden lg:block w-16" />
              <div className="lg:hidden flex justify-center items-center h-full cursor-pointer">
                <OpenIcon />
              </div>
              <h1 className="font-black uppercase text-3xl tracking-widest">
                your store
              </h1>
              <div className="cursor-pointer">
                <CartIcon />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default LoadingFallBack;
