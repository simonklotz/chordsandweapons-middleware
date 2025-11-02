export const fetchTrackQuery = /* GraphQL */ `
  query ($gid: String) {
    metaobject(id: $gid) {
      position: field(key: "position") {
        value
      }
      title: field(key: "title") {
        value
      }
      preview_url: field(key: "preview_url") {
        value
      }
    }
  }
`;
