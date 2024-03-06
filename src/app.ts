import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./config/db";
import rateLimit from "express-rate-limit";
import { errorHandler, notFoundMiddleware } from "./middleware/errorMiddleware";
import bookRoute from "./routes/bookRoute";
import authorRoute from "./routes/authorRoute";
import categoryRoute from "./routes/categoryRoute";
import { corOptions } from "./util/cors";
dotenv.config();

const app: Express = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });
app.use(limiter);
connectDb();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corOptions));
app.use("/api/v1/book", bookRoute);
app.use("/api/v1/author", authorRoute);
app.use("/api/v1/category", categoryRoute);
app.use(errorHandler);
app.use(notFoundMiddleware);

export default app;
