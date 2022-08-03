import React from 'react';
import {
  useShop,
  useSession,
  useShopQuery,
  gql,
  useServerAnalytics,
  ShopifyAnalyticsConstants,
  Seo,
} from '@shopify/hydrogen';
import Layout from '../../components/Layout.server';
import ProductCard from '../../components/ProductCard';
export default function Collection({params}) {
  const {languageCode} = useShop();
  const {countryCode = 'US'} = useSession();
  const {handle} = params;
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      handle,
      country: countryCode,
      language: languageCode,
      numProducts: 24,
    },
    preload: true,
  });
  const collection = data.collection;
  const products = data.collection.products.nodes;
  const hasNextPage = data.collection.products.pageInfo.hasNextPage;

  useServerAnalytics(
    data?.collection
      ? {
          shopify: {
            pageType: ShopifyAnalyticsConstants.pageType.collection,
            resourceId: data.collection.id,
          },
        }
      : null,
  );
  return (
    <Layout
      children={
        <>
          <Seo type="collection" data={collection} />
          <h1 className="font-bold text-4xl text-gray-900 mt-6 mb-6 md:text-5xl">
            {collection.title}
          </h1>
          <div
            dangerouslySetInnerHTML={{
              __html: collection.descriptionHtml,
            }}
          />
          <p className="text-sm mb-5 mt-5 text-gray-500">
            {products.length} {products.length > 1 ? 'products' : 'product'}
          </p>
          <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </>
      }
    />
  );
}
const QUERY = gql`
  query CollectionDetails(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $numProducts: Int!
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      title
      descriptionHtml
      description
      seo {
        description
        title
      }
      image {
        id
        url
        width
        height
        altText
      }
      products(first: $numProducts) {
        nodes {
          id
          title
          vendor
          handle
          descriptionHtml
          compareAtPriceRange {
            maxVariantPrice {
              currencyCode
              amount
            }
            minVariantPrice {
              currencyCode
              amount
            }
          }
          variants(first: 1) {
            nodes {
              id
              title
              availableForSale
              image {
                id
                url
                altText
                width
                height
              }
              priceV2 {
                currencyCode
                amount
              }
              compareAtPriceV2 {
                currencyCode
                amount
              }
            }
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  }
`;
