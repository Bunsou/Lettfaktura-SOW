import { Router } from "express";
import db from "../db/db_connect.js";
import { translationSchema } from "../db/schema.js";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/:language", async (req, res) => {
  try {
    const { language } = req.params;

    const rows = await db
      .select({ key: translationSchema.key, value: translationSchema.value })
      .from(translationSchema)
      .where(eq(translactionSchema.language, language));

    const translations = Object.fromEntries(
      rows.map((row) => [row.key, row.value]),
    );

    res.status(200).json({
      success: true,
      message: "Translations fetched successfully",
      data: translations,
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
