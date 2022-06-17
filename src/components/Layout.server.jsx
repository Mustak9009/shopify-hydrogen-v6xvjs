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
    //allows you to make server-only GraphQL queries to the Storefront API
    query: QUERY,
  }); //https://shopify.dev/api/hydrogen/hooks/global/useshopquery

  return (
    <>
      <Header data={data} />
      <Suspense fallback={null}>{children}</Suspense>
    </>
  );
};

const QUERY = gql`
{
  products(first: 2) {
    edges {
      node {
        title
        images(first: 1) {
          edges {
            node {
              url
            }
          }
        }
      }
    }
  }
}

`;
export default Layout;
