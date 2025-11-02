import { ProductListItem } from "./product-list-item.interface";

export interface ProductList {
  products: ProductListItem[];
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
}
