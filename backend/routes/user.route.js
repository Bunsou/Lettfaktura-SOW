import { Router } from "express";
import db from "../db/db_connect.js";
import { userSchema } from "../db/schema.js";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/me", async (req, res) => {
  try {
    const user = await db
      .select({
        id: userSchema.id,
        fullname: userSchema.fullname,
        email: userSchema.email,
        createdAt: userSchema.createdAt,
      })
      .from(userSchema)
      .where(eq(userSchema.id, req.user.id));

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user[0],
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
