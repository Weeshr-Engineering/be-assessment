import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { logger } from "./src/middlewares/logger";
import authorRoute from "./src/modules/routes/author";
import bookRoute from "./src/modules/routes/book";
import categoryRoute from "./src/modules/routes/category";

dotenv.config();
const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(logger);

//Routes
app.use("/api/v1/books", bookRoute);
app.use("/api/v1/authors", authorRoute);
app.use("/api/v1/categories", categoryRoute);

app.use("*", (req, res) => {
  res.status(404).json({ message: "This Route Not Found" });
});

export default app;
