import { PageInfo } from "./page-info.interface";
import { Price } from "./price.interface";

export interface ProductListResponse {
  products: {
    pageInfo: PageInfo;
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
        trackList: {
          value: Array<string> | null;
        } | null;
        totalInventory: number;
      };
    }>;
  };
}
