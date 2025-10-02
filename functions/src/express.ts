import type { Request, Response } from "express";
import express from "express";
import cors from "cors";
import { getFromCache, setToCache } from "./cache";
import { fetchProducts } from "./shopify/fetch-products";
import { Product } from "./models/product.interface";
import { PageInfo } from "./models/page-info.interface";
import { searchProducts } from "./shopify/search-products";

// Optional helper: derive buyer IP from proxy headers
function getBuyerIp(req: express.Request): string | undefined {
  const xf = req.headers["x-forwarded-for"];
  if (typeof xf === "string" && xf.length) {
    return xf.split(",")[0].trim();
  }
  return req.socket.remoteAddress || undefined;
}

export const app = express();
app.use(cors());

app.get("/products", async (req, res) => {
  const { after, first = 10 } = req.query;

  const cacheKey = `products:${after || "first"}:${first}`;
  const cached = await getFromCache<{ products: any; pageInfo: any }>(cacheKey);

  let products: Product[], pageInfo: PageInfo;

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

// GET /products/search?q=vinyl&first=12&after=cursor
app.get(
  "/products/search",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const rawQ = req.query?.q;
      const q = typeof rawQ === "string" ? rawQ.trim() : "";
      if (!q) {
        res.status(400).json({ error: "Missing q parameter" });
        return;
      }

      const rawFirst = req.query?.first;
      const first = Math.min(
        Math.max(
          parseInt(typeof rawFirst === "string" ? rawFirst : "10", 10) || 10,
          1,
        ),
        50,
      );

      const after =
        typeof req.query?.after === "string" ? req.query.after : undefined;

      // optional cache (use your existing helpers)
      const cacheKey = `search:${q}:${after || "first"}:${first}`;
      const cached = await getFromCache<{
        products: Product[];
        pageInfo: PageInfo;
      }>(cacheKey);
      if (cached) {
        res.json(cached);
        return;
      }

      const { products, pageInfo } = await searchProducts({
        text: q,
        first,
        after,
        buyerIp: getBuyerIp(req),
      });

      const payload = { products, pageInfo };
      await setToCache(cacheKey, payload);
      res.json(payload);
      return;
    } catch (err: any) {
      console.error("search error", err?.details ?? err?.message ?? err);
      res.status(502).json({ error: "Search failed" });
      return;
    }
  },
);
