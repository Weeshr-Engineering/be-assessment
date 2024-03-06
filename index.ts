import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();

// Config
const app = express();
app.use(express.json());
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Routes
import bookRoutes from "./src/routes/book";
import authorRoutes from "./src/routes/author";
import categoryRoutes from "./src/routes/category";

// Define routes
app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/categories", categoryRoutes);

const PORT = process.env.PORT || 5001;
mongoose
  .connect(
    "mongodb+srv://Heepjay:Hipjay69@cluster0.0ykgrrp.mongodb.net/bookstore"
  )
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
