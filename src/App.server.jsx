import renderHydrogen from '@shopify/hydrogen/entry-server';
import React, {Suspense} from 'react';
import {ShopifyProvider, Route, Router, FileRoutes} from '@shopify/hydrogen';
import LoadingFallBack from './components/LoadingFallBack';
import NotFound from './components/NotFound';
import ServerCartProvider from './components/ServerCartProvider.server';

const App = () => {
  return (
    <Suspense fallback={<LoadingFallBack />}>
      <ShopifyProvider>
        <ServerCartProvider>
          <Router>
            <FileRoutes />
            <Route path="*" page={<NotFound />}></Route>
          </Router>
        </ServerCartProvider>
      </ShopifyProvider>
    </Suspense>
  );
};
export default renderHydrogen(App);
