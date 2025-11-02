export interface TrackListResponse {
  references: {
    edges: Array<{
      node: {
        id: string;
        position: {
          value: string;
        };
        title: {
          value: string;
        };
        previewUrl: {
          value: string;
        } | null;
      };
    }>;
  };
}
