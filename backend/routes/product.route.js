import { Router } from "express";
import db from "../db/db_connect.js";
import { productSchema } from "../db/schema.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const {
      articleNo,
      productService,
      inPrice,
      price,
      unit,
      inStock,
      description,
    } = req.body;

    const newProduct = await db
      .insert(productSchema)
      .values({
        articleNo,
        productService,
        inPrice,
        price,
        unit,
        inStock,
        description,
      })
      .returning();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await db.select().from(productSchema);

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
});

export default router;
