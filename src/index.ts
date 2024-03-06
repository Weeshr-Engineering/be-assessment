import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bookRoutes from "./books/books.routes";
import db from "./config/dbConfig";
dotenv.config();

db.connectToMongoDB();

const app: Express = express();
const port = process.env.PORT || 3000;

// Parsing JSON
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Bookstore API");
});

bookRoutes(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
