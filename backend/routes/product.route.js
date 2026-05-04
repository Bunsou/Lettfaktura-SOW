import { Router } from "express";
import db from "../db/db_connect.js";
import { productSchema } from "../db/schema.js";
import { eq } from "drizzle-orm";

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

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      articleNo,
      productService,
      inPrice,
      price,
      unit,
      inStock,
      description,
    } = req.body;

    const updatedProduct = await db
      .update(productSchema)
      .set({
        articleNo,
        productService,
        inPrice,
        price,
        unit,
        inStock,
        description,
      })
      .where(eq(productSchema.id, id))
      .returning();

    if (updatedProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
        data: null,
      });
    }

    res.status(201).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await db
      .delete(productSchema)
      .where(eq(productSchema.id, id))
      .returning();

    if (deletedProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct[0],
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
