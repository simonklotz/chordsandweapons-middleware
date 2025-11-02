import { Product } from "../models/product.interface";
import { getShopifyClient } from "./get-shopify-client";
import { ProductResponse } from "./models/product-response.interface";
import { getInventoryStatus } from "./helpers/get-inventory-status.helper";
import { fetchProductQuery } from "./queries/fetch-product.query";
import { transformTrackList } from "./helpers/transform-track-list.helper";

export async function fetchProduct(id: string): Promise<Product | null> {
  const client = getShopifyClient();
  const gid = `gid://shopify/Product/${id}`;
  const { data, errors } = await client.request<ProductResponse>(
    fetchProductQuery,
    { variables: { gid } },
  );

  if (errors) {
    console.error(errors);
    throw new Error(errors.message);
  }

  const product = data?.product;
  if (!product) {
    return null;
  }

  return {
    id: Number(id),
    title: product.title,
    artist: product.artist?.value ?? "",
    price: product.priceRange.minVariantPrice,
    imageUrl: product.images.edges[0].node.url ?? "",
    description: product.description,
    inventoryStatus: getInventoryStatus(product.totalInventory),
    totalInventory: product.totalInventory,
    trackList: transformTrackList(product.trackList),
    genre: [], // TODO
    label: "", // TODO
    releaseDate: "", // TODO
  };
}
