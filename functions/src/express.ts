import express from "express";
import cors from "cors";
import { fetchProducts } from "./shopify";
import { Product } from "./models/product.interface";
import { PageInfo } from "./models/page-info.interface";

export const app = express();
app.use(cors());

app.get("/products", async (req, res) => {
  const { after, first = 10 } = req.query;

  let products: Product[], pageInfo: PageInfo;

  const result = await fetchProducts(after as string, Number(first));
  products = result.products;
  pageInfo = result.pageInfo;

  res.json({ products, pageInfo });
});
