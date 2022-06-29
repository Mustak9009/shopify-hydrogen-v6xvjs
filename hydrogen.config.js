import { defineConfig } from "@shopify/hydrogen/config";
import {
  CookieSessionStorage,
  PerformanceMetricsServerAnalyticsConnector,
  ShopifyServerAnalyticsConnector,
} from "@shopify/hydrogen";

export default defineConfig({
  shopify: {
    storeDomain: "hydrogen-learning-2.myshopify.com",
    storefrontToken: "5177694b3b70ead42a20084a5466018c",
    storefrontApiVersion: "2022-07",
  },
  session: CookieSessionStorage("__session", { //https://shopify.dev/api/hydrogen/components/framework/cookie
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30,
  }),
  serverAnalyticsConnectors: [
    PerformanceMetricsServerAnalyticsConnector,
    ShopifyServerAnalyticsConnector,
  ],
});
