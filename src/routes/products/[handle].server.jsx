import {
  Seo,
  useSession,
  useRouteParams,
  useShop,
  gql,
  useShopQuery,
} from '@shopify/hydrogen';
import Layout from '../../components/Layout.server';
import ProductDetails from '../../components/ProductDetails.client';
export default function Hanlde() {
  const {handle} = useRouteParams();
  const {languageCode} = useShop();
  
  const {countryCode = 'US'} = useSession();
  const {data:{product}} = useShopQuery({
    query: QUERY,
    variables: {
      country: countryCode,
      language: languageCode,
      handle,
    },
    preload: true,
  });
 
  return (
    <Layout
      children={
        <>
          <Seo type="product" data={product} />
          <ProductDetails product={product}/>
        </>
      }
    />
  );
}
const QUERY = gql`
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
   product(handle: $handle) {
      id
      title
      handle
      vendor
      description
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
      featuredImage {
        url
        width
        height
        altText
      }
      media(first: 6) {
        nodes {
          ... on MediaImage {
            mediaContentType
            image {
              id
              url
              width
              height
              altText
            }
          }
          ... on Video {
            id
            mediaContentType
            previewImage {
              url
            }
            sources {
              url
              mimeType
            }
          }
          ... on ExternalVideo {
            id
            host
            embedUrl
            mediaContentType
          }
          ... on Model3d {
            id
            alt
            mediaContentType
            previewImage {
              url
            }
            sources {
              url
            }
          }
        }
      }
      priceRange {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      seo {
        description
        title
      }
      variants(first: 250) {
        nodes {
          id
          sku
          title
          availableForSale
          compareAtPriceV2 {
            amount
            currencyCode
          }
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
          selectedOptions {
            name
            value
          }
          unitPrice {
            amount
            currencyCode
          }
          unitPriceMeasurement {
            measuredType
            quantityUnit
            quantityValue
            referenceUnit
            referenceValue
          }
        }
      }
    }
  }
`;
