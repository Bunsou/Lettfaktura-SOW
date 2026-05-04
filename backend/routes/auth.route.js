import { Router } from "express";
import db from "../db/db_connect.js";
import { userSchema } from "../db/schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Check if the user exist
    const user = await db
      .select()
      .from(userSchema)
      .where(eq(userSchema.email, email));

    if (user.length > 0) {
      return res.status(400).json({
        success: false,
        message: "This email already exists",
        data: null,
      });
    }

    // Register the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.insert(userSchema).values({
      fullname,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User is created successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db
      .select()
      .from(userSchema)
      .where(eq(userSchema.email, email));

    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      });
    }

    const passwordIsValid = await bcrypt.compare(password, user[0].password);

    if (!passwordIsValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
        data: null,
      });
    }

    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Login successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Logout successfully",
    data: null,
  });
});

export default router;
