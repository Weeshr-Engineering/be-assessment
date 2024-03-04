// loggingMiddleware.ts
import morgan from "morgan";
import fs from "fs";
import path from "path";

// Construct the path to the logs directory
const logsDir = path.resolve(__dirname, "../../logs");
const accessLogStream = fs.createWriteStream(path.join(logsDir, "access.log"), {
  flags: "a",
});

// Ensure the logs directory exists
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Morgan middleware to log HTTP requests
export const morganMiddleware = morgan("combined", { stream: accessLogStream });
