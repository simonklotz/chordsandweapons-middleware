import { Price } from "./price.interface";

export interface Product {
  id: number;
  title: string;
  artist: string;
  price: Price;
  imageUrl: string;
  description: string;
  inventoryStatus: "in_stock" | "low_stock" | "out_of_stock";
  totalInventory: number;
  trackList: string[];
  genre: string[];
  label: string;
  releaseDate: string;
}
