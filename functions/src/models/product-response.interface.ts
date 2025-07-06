import {PageInfo} from "./page-info.interface";

export interface ProductResponse {
    products: {
        pageInfo: PageInfo;
        edges: Array<{
            node: {
                id: string;
                title: string;
                description: string;
                metafield: {
                    value: Array<string> | null
                } | null
            }
        }>
    };
}