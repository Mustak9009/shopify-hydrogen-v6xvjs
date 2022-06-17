import React from "react";
import { LocalizationProvider, useShop } from "@shopify/hydrogen";
import { Suspense } from "react";
import Header from "./Header.client";
const Layout = ({ children }) => {
  const { storefrontApiVersion } = useShop(); //useShop hook provides access to values of (hydrogen.config.js) file (keys)
  console.log(storefrontApiVersion); // More info -> https://shopify.dev/api/hydrogen/hooks/global/useshop
  return (
    <LocalizationProvider preload="*">
      <Header />
      <Suspense fallback={null}>{children}</Suspense>
    </LocalizationProvider>
  );
};

export default Layout;
