import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import productRouter from "./routes/product.route.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import translationRouter from "./routes/translation.route.js";
import { authMiddleware } from "./middleware/auth.middleware.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());

app.use("/api/translations", translationRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", authMiddleware, productRouter);
app.use("/api/user", authMiddleware, userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
