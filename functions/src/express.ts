import express from "express";
import cors from "cors";
import { getFromCache, setToCache } from "./cache";
import { fetchProducts } from "./shopify";
import { Product } from "./models/product.interface";
import { PageInfo } from "./models/page-info.interface";

export const app = express();
app.use(cors());

app.get('/products', async (req, res) => {
    const { after, first = 10 } = req.query;
    const cacheKey = `products:${after || 'first'}:${first}`;

    let products: Product[], pageInfo: PageInfo;
    const cached = await getFromCache<{ products: any, pageInfo: any }>(cacheKey);
    if (cached) {
        products = cached.products;
        pageInfo = cached.pageInfo;
    } else {
        const result = await fetchProducts(after as string, Number(first));
        products = result.products;
        pageInfo = result.pageInfo;
        await setToCache(cacheKey, { products, pageInfo });
    }

    res.json({ products, pageInfo });
});