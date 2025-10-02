import { defineString } from "firebase-functions/params";
import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const shopifyApiVersion = defineString("SHOPIFY_API_VERSION");
const shopifyStoreDomain = defineString("SHOPIFY_STORE_DOMAIN");
const shopifyPublicAccessToken = defineString("SHOPIFY_PUBLIC_ACCESS_TOKEN");

export function getShopifyClient() {
  return createStorefrontApiClient({
    storeDomain: shopifyStoreDomain.value(),
    apiVersion: shopifyApiVersion.value(),
    publicAccessToken: shopifyPublicAccessToken.value(),
    // privateAccessToken: TODO
    retries: 2,
  });
}
