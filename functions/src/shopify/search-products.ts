import type { ResponseErrors } from "@shopify/graphql-client";
import { PageInfo } from "../models/page-info.interface";
import { Product } from "../models/product.interface";
import { SEARCH_PRODUCTS } from "../queries/products.search";
import { buildProductsQuery } from "./helpers/build-products-query";
import { getShopifyClient } from "./get-shopify-client";
import { SearchArgs } from "./models/search-args.type";
import { SearchProductsData } from "./models/search-products-data.type";

/**
 * Search products by free-text, returning your mapped Product[] + PageInfo.
 * Mirrors the shape of fetchProducts() so your Express layer can be uniform.
 */
export async function searchProducts({
  text,
  first = 10,
  after,
  buyerIp,
}: SearchArgs): Promise<{ products: Product[]; pageInfo: PageInfo }> {
  const client = getShopifyClient();
  const query = buildProductsQuery(text);

  const resp = await client.request<SearchProductsData>(SEARCH_PRODUCTS, {
    variables: { query, first, after: after ?? null },
    headers: buyerIp ? { "Shopify-Storefront-Buyer-IP": buyerIp } : undefined,
  });

  // ------ IMPORTANT: errors is ResponseErrors, not an array ------
  const errors: ResponseErrors | undefined = resp.errors;
  if (errors) {
    const details =
      Array.isArray(errors.graphQLErrors) && errors.graphQLErrors.length > 0
        ? errors.graphQLErrors
        : errors.message || "Unknown Storefront error";
    const e = new Error("Shopify search error");
    (e as any).details = details;
    (e as any).status = errors.networkStatusCode;
    throw e;
  }

  const edges = resp.data?.products?.edges ?? [];

  const mapped: Product[] = edges.map((edge) => {
    const n = edge.node;
    // choose first available image
    const firstImageUrl =
      n.images?.edges?.[0]?.node?.url || n.featuredImage?.url || undefined;

    // parse audioPreview if it contains JSON (optional)
    let audioPreview: string[] = [];
    try {
      if (n.audioPreview?.value) {
        const parsed = JSON.parse(n.audioPreview.value);
        if (Array.isArray(parsed)) audioPreview = parsed;
      }
    } catch {
      /* ignore parse errors, keep empty array */
    }

    return {
      id: n.id,
      title: n.title,
      artist: n.artist?.value ?? "",
      description: n.description,
      price: Number(n.priceRange.minVariantPrice.amount),
      imageUrl: firstImageUrl,
      audioPreview,
    };
  });

  const pageInfo: PageInfo = {
    hasNextPage: Boolean(resp.data?.products?.pageInfo?.hasNextPage),
    endCursor: resp.data?.products?.pageInfo?.endCursor ?? null,
  };

  return { products: mapped, pageInfo };
}
