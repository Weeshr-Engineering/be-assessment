import { Request, Response, NextFunction } from "express";
import { STATUS_CODES } from "../util/statusCode";
import { logger } from "../util/logger";

interface ErrorResponse {
  message: string;
  stack?: string | null;
}
const NODE_ENV: string | undefined = process.env.NODE_ENV;

export const errorHandler = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode: number = res.statusCode
    ? res.statusCode
    : STATUS_CODES.SERVER_ERROR;
  const errorResponse: ErrorResponse = {
    message: error.message,
    stack: NODE_ENV == "production" ? null : error.stack,
  };
  logger.error(error)
  return res.status(statusCode).json(errorResponse);
};

export const notFoundMiddleware = (req: Request, res: Response) => {
  res.status(STATUS_CODES.NOT_FOUND).json({
    success: false,
    message: "Endpoint Not Found",
    status: "Invalid Request",
  });
};
