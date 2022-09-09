import React from 'react';
import {
  LocalizationProvider,
  useShop,
  useShopQuery,
  gql,
  flattenConnection,
  CacheHours,
} from '@shopify/hydrogen';
import {Suspense} from 'react';
import Header from './Header.client';
import Cart from './Cart.client';
import Footer from './Footer.server';
const Layout = ({children, hero}) => {
  const {languageCode} = useShop(); //useShop hook provides access to values of (hydrogen.config.js) file (keys)
  // More info -> https://shopify.dev/api/hydrogen/hooks/global/useshop
  const {data} = useShopQuery({
    //allows you to make server-only GraphQL queries to the Storefront API
    query: QUERY,
    variables: {
      language: languageCode,
      numCollections: 3,
    },
    cache: CacheHours(),
    preload: '*',
  }); //https://shopify.dev/api/hydrogen/hooks/global/useshopquery
  const collections = data ? flattenConnection(data.collections) : null; //flatterConnection utility help to transform storefront Object into a ->Flatt Array
  const products = data ? flattenConnection(data.products) : null;
  const shopName = data ? data.shop.name : null;

  return (
    <LocalizationProvider preload="*">
      <Suspense fallback={null}>
        <Header collections={collections} shopName={shopName} />
        <Cart />
      </Suspense>
      <main role="main" id="mainComponent" className="relative bg-gray-50">
        {hero}
        <div className="mx-auto max-w-7xl p-4 md:py-5 md:px-8">
          <Suspense fallback={null}>{children}</Suspense>
        </div>
      </main>
      <Footer collections={collections[0]} products={products[0]}/>
    </LocalizationProvider>
  );
};

const QUERY = gql`
  query layoutContent($language: LanguageCode, $numCollections: Int!)
  @inContext(language: $language) {
    shop {
      name
    }
    collections(first: $numCollections) {
      edges {
        node {
          description
          handle
          id
          title
        }
      }
    }
    products(first:1){
      edges{
        node{
          handle
        }
      }
    }
  }
`;

export default Layout;
