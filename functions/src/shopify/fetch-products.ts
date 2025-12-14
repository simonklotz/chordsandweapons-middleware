import { ProductListResponse } from "./models/product-list-response.interface";
import { toNumericId } from "./helpers/to-numeric-id.helper";
import { ProductList } from "../models/product-list.interface";
import { getShopifyClient } from "./get-shopify-client";
import { fetchProductsQuery } from "./queries/fetch-products.query";
import { getInventoryStatus } from "./helpers/get-inventory-status.helper";
import { transformTrackList } from "./helpers/transform-track-list.helper";

export async function fetchProducts(
  after?: string,
  first = 20,
): Promise<ProductList> {
  const client = getShopifyClient();
  const { data, errors } = await client.request<ProductListResponse>(
    fetchProductsQuery,
    {
      variables: { first, after },
    },
  );

  if (errors) {
    console.error(errors);
    throw new Error(errors.message);
  }

  const products = data?.products;
  if (!products) {
    return {
      products: [],
      total: 0,
      page: 0,
      limit: 0,
      hasNextPage: false,
    };
  }

  return {
    products: products.edges.map((edge) => ({
      id: toNumericId(edge.node.id),
      title: edge.node.title,
      artist: edge.node.artist?.value ?? "",
      price: edge.node.priceRange.minVariantPrice,
      images: edge.node.images.edges.map(edge => edge.node.url ?? ''),
      inventoryStatus: getInventoryStatus(edge.node.totalInventory),
      trackList: transformTrackList(edge.node.trackList),
    })),
    total: 0, // TODO
    page: 1, // TODO
    limit: 20,
    hasNextPage: products.pageInfo.hasNextPage,
  };
}
