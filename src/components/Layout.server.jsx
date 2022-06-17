import React from "react";
import { LocalizationProvider, useShop } from "@shopify/hydrogen";
import { Suspense } from "react";
import Header from "./Header.client";
const Layout = ({ children }) => {
  const { locale } = useShop();
  console.log(locale);
  return (
    <LocalizationProvider preload="*">
      <Header />
      <Suspense fallback={null}>{children}</Suspense>
    </LocalizationProvider>
  );
};

export default Layout;
