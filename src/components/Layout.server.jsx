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
const Layout = ({children}) => {
  const {languageCode} = useShop(); //useShop hook provides access to values of (hydrogen.config.js) file (keys)
  console.log(languageCode); // More info -> https://shopify.dev/api/hydrogen/hooks/global/useshop
  const {data} = useShopQuery({ //allows you to make server-only GraphQL queries to the Storefront API
    query: QUERY,
    variables: {
      language: languageCode,
      numCollections: 3,
    },
    cache: CacheHours(),
    preload: '*',
  }); //https://shopify.dev/api/hydrogen/hooks/global/useshopquery
  const collections = data ? flattenConnection(data.collections) : null; //flatterConnection utility help to transform storefront Object into a ->Flatt Array
  const shopName = data ? data.shop.name : null;
  return (
    <LocalizationProvider preload="*">
      <Header collections={collections} shopName={shopName}/>
      <Suspense fallback={null}>{children}</Suspense>
    </LocalizationProvider>
  );
};  

const QUERY = gql`
  query layoutContent($language: LanguageCode, $numCollections: Int!)
  @inContext(language:$language){
    shop{
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
  }
`;

export default Layout;
