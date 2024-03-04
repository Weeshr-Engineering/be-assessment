import express from "express";
import morgan from "morgan";
import { registerApiRoutes } from "./utils/apiUtils";
import "dotenv/config";
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./swagger");
import { errorHandler } from "./middlewares/errorhandler";
import cookieParser from "cookie-parser";
import { readdirSync } from "fs";
import { morganMiddleware } from "./middlewares/accesslogger";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());

// app.use(morgan("dev"));
app.use(morganMiddleware);

//  Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));

// Dynamically serve all routes
registerApiRoutes("v1", app);
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { app, server };
