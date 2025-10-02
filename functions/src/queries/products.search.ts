import { PRODUCT_CARD_FRAGMENT } from "./fragments.product";

export const SEARCH_PRODUCTS = /* GraphQL */ `
  ${PRODUCT_CARD_FRAGMENT}
  query SearchProducts($query: String!, $first: Int!, $after: String) {
    products(query: $query, first: $first, after: $after, sortKey: RELEVANCE) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          ...ProductCard
        }
      }
    }
  }
`;
