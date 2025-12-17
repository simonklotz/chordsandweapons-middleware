import { Price } from "../../models/price.interface";
import { TrackListResponse } from "./track-list-response.interface";

export interface ProductListItemResponse {
  node: {
    id: string;
    title: string;
    artist: {
      value: string;
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
}