export const fetchProductQuery = /* GraphQL */ `
  query ($gid: ID) {
    product(id: $gid) {
      title
      artist: metafield(namespace: "custom", key: "artist") {
        value
      }
      format: metafield(namespace: "custom", key: "format") {
        value
      }
      label: metafield(namespace: "custom", key: "label") {
        value
      }
      description
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
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
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
`;
