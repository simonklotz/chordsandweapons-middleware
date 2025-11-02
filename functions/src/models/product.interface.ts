import { Price } from "./price.interface";
import { Track } from "./track.interface";

export interface Product {
  id: number;
  title: string;
  artist: string;
  price: Price;
  imageUrl: string;
  description: string;
  inventoryStatus: "in_stock" | "low_stock" | "out_of_stock";
  totalInventory: number;
  trackList: Track[];
  genre: string[];
  label: string;
  releaseDate: string;
}
