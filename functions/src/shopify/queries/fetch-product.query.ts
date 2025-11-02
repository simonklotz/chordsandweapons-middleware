export const fetchProductQuery = /* GraphQL */ `
  query ($gid: ID) {
    product(id: $gid) {
      title
      artist: metafield(namespace: "custom", key: "artist") {
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
      images(first: 2) {
        edges {
          node {
            url
            altText
          }
        }
      }
      trackList: metafield(namespace: "custom", key: "track_list") {
        value
      }
      totalInventory
    }
  }
`;
