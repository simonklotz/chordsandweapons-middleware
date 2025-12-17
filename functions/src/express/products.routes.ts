import { Router } from "express";
import { fetchProducts } from "../shopify/fetch-products";
import { fetchProduct } from "../shopify/fetch-product";
import { searchProducts } from "../shopify/search-products";

export const productsRouter = Router();

/**
 * GET /products
 * Optional query params:
 *  - first: number of items per page (default 20)
 *  - after: Shopify cursor for pagination
 */
productsRouter.get("/", async (req, res) => {
  try {
    const firstParam = req.query.first;
    const afterParam = req.query.after;

    const first =
      typeof firstParam === "string" && /^\d+$/.test(firstParam)
        ? Math.min(Math.max(parseInt(firstParam, 10), 1), 50)
        : 20;
    const after = typeof afterParam === "string" ? afterParam : undefined;

    const result = await fetchProducts(after, first);
    res.json(result);
  } catch (e) {
    console.error("GET /products failed:", e);
    res.status(500).send("Failed to fetch products");
  }
});

/**
 * GET /products/search
 * Required query params:
 *  - q: search query string
 * Optional query params:
 *  - first: number of items per page (default 20)
 *  - after: Shopify cursor for pagination
 *
 * Searches across product title (release), artist metafield, and label metafield.
 * Supports partial matching (e.g., "perl" matches "Perlon").
 * Uses Shopify's native search API with productFilters for optimal performance.
 */
productsRouter.get("/search", async (req, res) => {
  try {
    const queryParam = req.query.q;
    const firstParam = req.query.first;
    const afterParam = req.query.after;

    if (!queryParam || typeof queryParam !== "string") {
      return res.status(400).json({
        error: "Missing or invalid search query parameter 'q'",
      });
    }

    const searchQuery = queryParam.trim();
    if (searchQuery.length === 0) {
      return res.status(400).json({
        error: "Search query cannot be empty",
      });
    }

    if (searchQuery.length < 2) {
      return res.status(400).json({
        error: "Search query must be at least 2 characters",
      });
    }

    const first =
      typeof firstParam === "string" && /^\d+$/.test(firstParam)
        ? Math.min(Math.max(parseInt(firstParam, 10), 1), 50)
        : 20;
    const after = typeof afterParam === "string" ? afterParam : undefined;

    const result = await searchProducts(searchQuery, first, after);
    return res.json(result);
  } catch (e) {
    console.error("GET /products/search failed:", e);
    return res.status(500).json({ error: "Failed to search products" });
  }
});

/**
 * GET /products/:id
 * Example: /products/15574017540478  (numeric part of Shopify GID)
 */
productsRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await fetchProduct(id);

    if (!result) {
      res.status(404).send(`Product not found: ${id}`);
    }

    res.json(result);
  } catch (e) {
    console.error(`GET /products/${req.params.id} failed:`, e);
    res.status(500).send("Failed to fetch product");
  }
});
