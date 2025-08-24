export interface Product {
    id?: string;
    title: string;
    artist: string;
    description: string;
    price: number;
    imageUrl: string;
    audioPreview: Array<string>
}