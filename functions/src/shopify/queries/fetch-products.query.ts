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
`;
