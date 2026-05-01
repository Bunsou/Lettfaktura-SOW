import express from "express";
import "dotenv/config";
import productRouter from "./routes/product.route.js";
import userRouter from "./routes/user.route.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
