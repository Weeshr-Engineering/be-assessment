import express from "express";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import { specs } from "./swagger";
import { errorHandler } from "./middlewares/error";

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//  Swagger Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Routes

// Error Handler
app.use(errorHandler);

// Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
