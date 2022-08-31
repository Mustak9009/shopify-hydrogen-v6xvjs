import {gql, Link, useSession, useShop, useShopQuery} from '@shopify/hydrogen';
import React, {Suspense} from 'react';
import Layout from '../components/Layout.server';
import Welcome from '../components/welcome.server';
import ProductCard from '../components/ProductCard';
import FetureCollection from '../components/FetureCollection';

export default function Index() {
  const {countryCode = 'IN'} = useSession();
  return (
    <Layout hero={<GradientBackground />}>
      <div className="relative mb-12">
        <Welcome />
        <Suspense fallback={<BoxFallBack />}>
          <FetureProductBox country={countryCode}/>
        </Suspense>
        <Suspense fallback={<BoxFallBack/>}>
          <FetureCollectionBox country={countryCode}/>
        </Suspense>
      </div>
    </Layout>
  );
}

function FetureProductBox({country}) {
  const {languageCode} = useShop();
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      country,
      language: languageCode,
    },
    preload: true,
  });
  const collections = data ? data.collections.nodes : [];
  // console.log(collections)
  const fetureCollectionProduct = collections[0];
  const fetureProducts = fetureCollectionProduct ? fetureCollectionProduct.products.nodes : null;
  return (
    <div className="bg-white p-12 shadow-xl rounded-xl mb-10">
      {fetureCollectionProduct ? (
        <>
          <div className="flex justify-between items-center mb-8 text-md font-medium">
            <span className="text-black uppercase">{fetureCollectionProduct.title}</span>
            <span className="hidden md:inline-flex">
              <Link to={`/collections/${fetureCollectionProduct.handle}`} className="text-blue-600 hover:underline">
                Shop all
              </Link>
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {fetureProducts.map((product)=>(
                <div key={product.id}>
                    <ProductCard product={product}/>
                </div>
            ))}
          </div>
          <div className="md:hidden text-center">
            <Link to={`/collections/${fetureCollectionProduct.handle}`} className="text-blue-600">
              Shop all
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
}
function BoxFallBack() {
  return <div className="bg-white p-12 shadow-xl rounded-xl mb-10 h-40"></div>;
}
function GradientBackground() {
  return (
    <div className="fixed top-0 w-full h-3/5 overflow-hidden">
      <div className="absolute w-full h-full bg-gradient-to-t from-gray-50 z-10" />

      <svg
        viewBox="0 0 960 743"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className="filter blur-[30px]"
        aria-hidden="true"
      >
        <defs>
          <path fill="#fff" d="M0 0h960v540H0z" id="reuse-0" />
        </defs>
        <g clipPath="url(#a)">
          <use xlinkHref="#reuse-0" />
          <path d="M960 0H0v743h960V0Z" fill="#7CFBEE" />
          <path
            d="M831 380c200.48 0 363-162.521 363-363s-162.52-363-363-363c-200.479 0-363 162.521-363 363s162.521 363 363 363Z"
            fill="#4F98D0"
          />
          <path
            d="M579 759c200.479 0 363-162.521 363-363S779.479 33 579 33 216 195.521 216 396s162.521 363 363 363Z"
            fill="#7CFBEE"
          />
          <path
            d="M178 691c200.479 0 363-162.521 363-363S378.479-35 178-35c-200.4794 0-363 162.521-363 363s162.5206 363 363 363Z"
            fill="#4F98D0"
          />
          <path
            d="M490 414c200.479 0 363-162.521 363-363S690.479-312 490-312 127-149.479 127 51s162.521 363 363 363Z"
            fill="#4F98D0"
          />
          <path
            d="M354 569c200.479 0 363-162.521 363-363 0-200.47937-162.521-363-363-363S-9 5.52063-9 206c0 200.479 162.521 363 363 363Z"
            fill="#7CFBEE"
          />
          <path
            d="M630 532c200.479 0 363-162.521 363-363 0-200.4794-162.521-363-363-363S267-31.4794 267 169c0 200.479 162.521 363 363 363Z"
            fill="#4F98D0"
          />
        </g>
        <path fill="#fff" d="M0 540h960v203H0z" />
        <defs>
          <clipPath id="a">
            <use xlinkHref="#reuse-0" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
function FetureCollectionBox({country}){
  const {languageCode} = useShop();
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      country,
      language: languageCode,
    },
    preload: true,
  });
  const collection = data ? data.collections.nodes : [];
  const fetureCollection = collection && collection.length > 1 ? collection[0]:collection[1]; 
  return(
    <FetureCollection collection={fetureCollection}/>
  )
}
const QUERY = gql`
  query indexQuery($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collections(first: 2) {
      nodes {
        handle
        id
        title
        description
        image {
          id
          url
          width
          height
          altText
        }
        products(first: 3) {
          nodes {
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
                  amount
                  currencyCode
                }
                compareAtPriceV2 {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;
