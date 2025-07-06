import express from "express";
import cors from "cors";
import { getFromCache, setToCache } from "./cache";
import { fetchProducts } from "./shopify";

export const app = express();
app.use(cors());

app.get('/api/products', async (req, res) => {
    const { after, first = 10 } = req.query;
    const cacheKey = `products:${after || 'first'}:${first}`;

    let products, pageInfo;
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