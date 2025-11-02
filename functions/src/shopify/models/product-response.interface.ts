import { Price } from "../../models/price.interface";
import { TrackListResponse } from "./track-list-response.interface";

export interface ProductResponse {
  product: {
    title: string;
    artist: {
      value: string | null;
    } | null;
    description: string;
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
}
