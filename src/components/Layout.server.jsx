import React from "react";
import {
  LocalizationProvider,
  useShop,
  useShopQuery,
  gql,
} from "@shopify/hydrogen";
import { Suspense } from "react";
import Header from "./Header.client";
const Layout = ({ children }) => {
  const { languageCode } = useShop(); //useShop hook provides access to values of (hydrogen.config.js) file (keys)
  console.log(languageCode); // More info -> https://shopify.dev/api/hydrogen/hooks/global/useshop
  const { data } = useShopQuery({
    query: QUERY,
  });
  console.log(data);
  return (
    <>
      <Header />
      <Suspense fallback={null}>{children}</Suspense>
    </>
  );
};

const QUERY = gql`
  {
    shop{
      name
    }
  }
`;
export default Layout;
