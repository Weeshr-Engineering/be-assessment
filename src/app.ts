import express from "express";
import morgan from "morgan";
import { registerApiRoutes } from "./utils/apiUtils";
import "dotenv/config";
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./swagger");

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));

//  Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));

// Dynamically serve all routes
registerApiRoutes("v1", app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
