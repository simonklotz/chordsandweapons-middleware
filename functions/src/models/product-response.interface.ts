import { PageInfo } from "./page-info.interface";

interface Price {
    amount: string;
    currencyCode: string;
}

export interface ProductResponse {
    products: {
        pageInfo: PageInfo;
        edges: Array<{
            node: {
                id: string;
                title: string;
                description: string;
                priceRange: {
                    minVariantPrice: Price;
                    maxVariantPrice: Price;
                };
                images: {
                    edges: Array<{
                        node: {
                            url: string;
                            altText: string | null
                        }
                    }>
                };
                artist: {
                    value: string | null
                } | null;
                audioPreview: {
                    value: Array<string> | null
                } | null;
            }
        }>
    };
}