import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db";
import { errorHandler, notFoundMiddleware } from "./middleware/errorMiddleware";
import bookRoute from "./routes/bookRoute";
import authorRoute from "./routes/authorRoute";
dotenv.config();

const app: Express = express();

connectDb();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/book", bookRoute);
app.use("/api/v1/author" ,authorRoute)

app.use(errorHandler);
app.use(notFoundMiddleware);

export default app;
