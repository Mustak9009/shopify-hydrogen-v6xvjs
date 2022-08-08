import renderHydrogen from '@shopify/hydrogen/entry-server';
import React, {Suspense} from 'react';
import {
  ShopifyProvider,
  Route,
  Router,
  FileRoutes,
} from '@shopify/hydrogen';
import LoadingFallBack from './components/LoadingFallBack';
import NotFound from './components/NotFound';
const App = () => {
  return (
    <Suspense fallback={<LoadingFallBack />}>
      <ShopifyProvider>
        <Router>
          <FileRoutes />
          <Route path="*" page={<NotFound />}></Route>
        </Router>
      </ShopifyProvider>
    </Suspense>
  );
};
export default renderHydrogen(App);
