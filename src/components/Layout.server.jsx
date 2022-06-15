import React from "react";
import { LocalizationProvider } from "@shopify/hydrogen";
import { Suspense } from "react";
import Header from "./Header.client";
const Layout = ({ children }) => {
  return (
    <LocalizationProvider preload="*">
      <Header />
      <Suspense fallback={null}>{children}</Suspense>
    </LocalizationProvider>
  );
};

export default Layout;
