import { toNumericId } from "./helpers/to-numeric-id.helper";
import { ProductList } from "../models/product-list.interface";
import { getShopifyClient } from "./get-shopify-client";
import { searchProductsQuery } from "./queries/search-products.query";
import { getInventoryStatus } from "./helpers/get-inventory-status.helper";
import { transformTrackList } from "./helpers/transform-track-list.helper";
import { SearchResponse } from "./models/search-response.interface";

/**
 * Search for products across title (release), artist, and label fields using Shopify's native search API.
 *
 * Strategy:
 * - Uses Shopify's search query for full-text search on product titles
 * - Leverages productFilters for metafield filtering (artist and label)
 * - Supports partial matching via wildcard syntax
 * - All filtering happens server-side for optimal performance
 *
 * @param searchQuery - The search term from the user
 * @param first - Number of products to fetch (default: 20)
 * @param after - Cursor for pagination
 * @returns ProductList with search results
 *
 */
export async function searchProducts(
  searchQuery: string,
  first = 20,
  after?: string,
): Promise<ProductList> {
  const trimmedQuery = searchQuery.trim();

  if (!trimmedQuery) {
    return {
      products: [],
      total: 0,
      page: 0,
      limit: 0,
      hasNextPage: false,
    };
  }

  const client = getShopifyClient();

  // Build the search query with wildcards for partial matching
  // This searches in product title and other default searchable fields
  const query = `*${trimmedQuery}*`;

  // Build productFilters for metafield searching
  // We'll search for matches in both artist and label metafields
  const productFilters = [
    {
      productMetafield: {
        namespace: "custom",
        key: "artist",
        value: `*${trimmedQuery}*`,
      },
    },
    {
      productMetafield: {
        namespace: "custom",
        key: "label",
        value: `*${trimmedQuery}*`,
      },
    },
  ];

  const { data, errors } = await client.request<SearchResponse>(
    searchProductsQuery,
    {
      variables: {
        first,
        after,
        query,
        productFilters,
      },
    },
  );

  if (errors) {
    console.error("Search products error:", errors);
    throw new Error(errors.message);
  }

  const searchResult = data?.search;
  if (!searchResult || searchResult.edges.length === 0) {
    return {
      products: [],
      total: 0,
      page: 0,
      limit: first,
      hasNextPage: false,
    };
  }

  // Transform search results to match your ProductList format
  const products = searchResult.edges.map((edge) => ({
    id: toNumericId(edge.node.id),
    title: edge.node.title,
    artist: edge.node.artist?.value ?? "",
    price: edge.node.priceRange.minVariantPrice,
    images: edge.node.images.edges.map((imgEdge) => imgEdge.node.url ?? ""),
    inventoryStatus: getInventoryStatus(edge.node.totalInventory),
    trackList: transformTrackList(edge.node.trackList),
  }));

  return {
    products,
    total: products.length,
    page: 1,
    limit: first,
    hasNextPage: searchResult.pageInfo.hasNextPage,
  };
}
