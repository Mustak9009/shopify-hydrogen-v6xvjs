import React from 'react';
import {
  flattenConnection,
  gql,
  useSession,
  useShop,
  useShopQuery,
} from '@shopify/hydrogen';
import Layout from './Layout.server';
import Button from './Button.client';
import ProductCard from './ProductCard';
const NotFound = ({response}) => {
  if (response) {
    response.doNotStream();
    response.status = 404;
    response.statusText = 'Not found';
  }
  const {countryCode = 'IN'} = useSession();
  const {languageCode} = useShop();
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      countryCode,
      language: languageCode,
    },
  });
  const products = data ? flattenConnection(data.products) : null;
  return (
    <Layout>
      <NotFountHero />
      <div className="my-8">
        <p className="mb-8 text-lg text-black font-medium uppercase">
          Products you might like.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
          {products.map((product)=>(
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
function NotFountHero() {
  return (
    <div className="py-10 border-b border-gray-200">
      <div className="max-w-3xl text-center mx-4 md:mx-auto">
        <h1 className="font-bold text-4xl md:text-5xl text-gray-900 mb-6 mt-6">
          We&#39;ve lost this page
        </h1>
        <p className="text-lg m-8 text-gray-500">
          We couldn’t find the page you’re looking for. Try checking the URL or
          heading back to the home page.
        </p>
        <Button
          className="w-full md:mx-auto md:w-96"
          url="/"
          label="Take me to the home page."
        />{' '}
        {/*In this case className is not a (attribute for style component), It's a parameter.*/}
      </div>
    </div>
  );
}
const QUERY = gql`
  query NotFondProductDetails(
    $countryCode: CountryCode
    $language: LanguageCode
  ) @inContext(country: $countryCode, language: $language) {
    products(first: 3) {
      edges {
        node {
          id
          title
          handle
          variants(first: 1) {
              nodes {
                id
                title
                availableForSale
                image {
                  id
                  url
                  width
                  height
                  altText
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
      }
    }
  }
`;
export default NotFound;
