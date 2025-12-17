export const searchProductsQuery = /* GraphQL */ `
  query (
    $first: Int
    $after: String
    $query: String!
    $productFilters: [ProductFilter!]
  ) {
    search(
      first: $first
      after: $after
      query: $query
      productFilters: $productFilters
      types: [PRODUCT]
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          ... on Product {
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
            images(first: 1) {
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
              references(first: 20) {
                edges {
                  node {
                    ... on Metaobject {
                      id
                      position: field(key: "position") {
                        value
                      }
                      title: field(key: "title") {
                        value
                      }
                      previewUrl: field(key: "preview_url") {
                        value
                      }
                    }
                  }
                }
              }
            }
            totalInventory
          }
        }
      }
    }
  }
`;
