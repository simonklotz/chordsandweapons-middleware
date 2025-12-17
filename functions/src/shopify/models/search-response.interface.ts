import { ProductListItemResponse } from "./product-list-item-response.interface";

export interface SearchResponse {
  search: {
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
    edges: Array<ProductListItemResponse>;
  };
}
