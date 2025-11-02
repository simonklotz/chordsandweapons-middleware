import express from "express";
import cors from "cors";
import { productsRouter } from "./products.routes";

export const app = express();

app.use(cors());
app.use(express.json());

/** product endpoints */
app.use("/products", productsRouter);

/** quick health check */
app.get("/health", (_req, res) => res.send("ok"));
