import { defineConfig } from "@shopify/hydrogen/config";
import {
  CookieSessionStorage,
  PerformanceMetricsServerAnalyticsConnector,
  ShopifyServerAnalyticsConnector,
} from "@shopify/hydrogen";

export default defineConfig({
  shopify: {
    storeDomain: "customiziedwithhydrogen.myshopify.com",
    storefrontToken: "26d26690b1d1718a534fc479d9a93ea5",
    storefrontApiVersion: "2022-07",
  },
  session: CookieSessionStorage("__session", {
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
