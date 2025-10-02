export interface Product {
  id?: string;
  title: string;
  artist: string;
  description: string;
  price: number;
  imageUrl: string | undefined;
  audioPreview: Array<string>;
}
