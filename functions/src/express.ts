import express from "express";
import cors from "cors";
import { fetchProducts } from "./shopify/fetch-products";
import { fetchTrack } from "./shopify/fetch-track";
import { fetchProduct } from "./shopify/fetch-product";

export const app = express();
app.use(cors());

app.get("/products", async (req, res) => {
  const { after, first = 20 } = req.query;
  const result = await fetchProducts(after as string, Number(first));
  res.json({
    products: result.products,
    total: result.total,
    page: result.page,
    limit: result.limit,
    hasNextPage: result.hasNextPage,
  });
});

app.get("/product", async (req, res) => {
  const id = req.query.id as string;
  const result = await fetchProduct(id);

  if (result) {
    res.json(result);
  } else {
    res.status(404).send(`Could not find product with id: ${id}`);
  }
});

app.get("/track", async (req, res) => {
  const { gid } = req.query;
  const result = await fetchTrack(gid as string);

  if (result) {
    res.json({
      gid: result.gid,
      position: result.position,
      title: result.title,
      previewUrl: result.previewUrl,
    });
  } else {
    res.status(404).send(`Could not find track with gid: ${gid}`);
  }
});
