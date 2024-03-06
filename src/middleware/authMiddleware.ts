import express, { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { logger } from "../util/logger";
import "dotenv/config";
import { STATUS_CODES } from "../util/statusCode";

/**
 * ? Authotization Middlware
 * * @desc Protect Routes
 * * @param req
 * * @param res
 * @param next
 * @returns Response
 */
export const protectAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string | null = null;
  // * check for token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "");
       req.body.user = decoded;
      next();
    } catch (error) {
      logger.error(error);
      return res.status(401).json({
        success: false,
        message: "Not authorized",
        status: "Invalid Request",
      });
    }
    // ? mssing token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized , no token",
        status: "Invalid Request",
      });
    }
  }
};


