import { defineString } from 'firebase-functions/params';
import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import { Product } from "./models/product.interface";
import { PageInfo } from "./models/page-info.interface";
import { ProductResponse } from "./models/product-response.interface";

const shopifyApiVersion = defineString('SHOPIFY_API_VERSION');
const shopifyStoreDomain = defineString('SHOPIFY_STORE_DOMAIN');
const shopifyPublicAccessToken = defineString('SHOPIFY_PUBLIC_ACCESS_TOKEN');

function getShopifyClient() {
    return createStorefrontApiClient({
        storeDomain: shopifyStoreDomain.value(),
        apiVersion: shopifyApiVersion.value(),
        publicAccessToken: shopifyPublicAccessToken.value(),
    });
}

export async function fetchProducts(after?: string, first = 10): Promise<{ products: Product[], pageInfo: PageInfo }> {
    const client = getShopifyClient();
    const query = `
      query($first: Int, $after: String) {
        products(first: $first, after: $after) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              title
              description
              images(first: 2) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
                maxVariantPrice {
                  amount
                  currencyCode
                }
              }
              artist: metafield(namespace: "custom", key: "artist") {
                value
              }
              audioPreview: metafield(namespace: "custom", key: "audio_preview") {
                value
              }
            }
          }
        }
      }
    `

    const variables = { first, after };
    const { data, errors } = await client.request<ProductResponse>(query, {variables: variables});

    if (errors) {
        console.error(errors);
        throw new Error(errors.message);
    }

    return data ? {
        products: data.products.edges.map(edge => ({
            id: edge.node.id,
            title: edge.node.title,
            artist: edge.node.artist?.value ?? '',
            description: edge.node.description,
            price: Number(edge.node.priceRange.minVariantPrice.amount),
            imageUrl: edge.node.images.edges[0]?.node.url,
            audioPreview: edge.node.audioPreview?.value ?? []
        })),
        pageInfo: data?.products.pageInfo!
    } : {
        products: [],
        pageInfo: {
            hasNextPage: false, endCursor: null
        }
    }
}