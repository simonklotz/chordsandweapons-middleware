import { Price } from "../../models/price.interface";
import { TrackListResponse } from "./track-list-response.interface";

export interface ProductListResponse {
  products: {
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
    edges: Array<{
      node: {
        id: string;
        title: string;
        artist: {
          value: string | null;
        } | null;
        priceRange: {
          minVariantPrice: Price;
          maxVariantPrice: Price;
        };
        images: {
          edges: Array<{
            node: {
              url: string;
              altText: string | null;
            };
          }>;
        };
        trackList: TrackListResponse | null;
        totalInventory: number;
      };
    }>;
  };
}
