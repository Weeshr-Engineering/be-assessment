import morgan from "morgan";
import fs from "fs";
import path from "path";

const logsDir = path.resolve(__dirname, "../../logs");
const logFilePath = path.join(logsDir, "access.log");

// Ensure the logs directory exists
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const accessLogStream = fs.createWriteStream(logFilePath, { flags: "a" });

// Custom stream that logs to both console and file
const stream = {
  write: (message: string) => {
    console.log(message.trim()); // Log to console
    accessLogStream.write(message); // Log to file
  },
};

export const morganMiddleware = morgan("combined", { stream });
