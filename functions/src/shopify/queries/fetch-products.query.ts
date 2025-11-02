export const fetchProductsQuery = /* GraphQL */ `
  query ($first: Int, $after: String) {
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
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
          images(first: 2) {
            edges {
              node {
                url
                altText
              }
            }
          }
          artist: metafield(namespace: "custom", key: "artist") {
            value
          }
          trackList: metafield(namespace: "custom", key: "track_list") {
            value
          }
          totalInventory
        }
      }
    }
  }
`;
