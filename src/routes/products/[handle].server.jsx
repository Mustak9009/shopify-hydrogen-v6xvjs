import {Seo, useSession,useRouteParams, useShop, useServerAnalytics, ShopifyAnalyticsConstants} from '@shopify/hydrogen';
import Layout from '../../components/Layout.server';
import ProductDetails from '../../components/ProductDetails.client';
export default function Hanlde() {
  const {handle} = useRouteParams();
  const {languageCode} = useShop();
  const {countryCode = 'US'} = useSession();
  // useServerAnalytics(
  //   data?.collection
  //     ? {
  //         shopify: {
  //           pageType: ShopifyAnalyticsConstants.pageType.product,
  //           resourceId: 'ha',
  //         },
  //       }
  //     : null,
  // );
  return (
    <Layout
      children={
        <>
          <Seo type="product" data={{title: 'Product page'}} />
          <ProductDetails/>
        </>
      }
    />
  );
}
