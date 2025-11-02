import { Price } from "./price.interface";

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
    trackList: {
      value: Array<string> | null;
    } | null;
    totalInventory: number;
  };
}