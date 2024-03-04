import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import "dotenv/config";

import { UnauthorizedError } from "../middlewares/errorhandler";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}
const secret = process.env.JWT_SECRET as Secret;

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new UnauthorizedError("No token provided");
    }

    const payload = jwt.verify(token, secret) as JwtPayload;

    // Attach the payload to the request object
    (req as CustomRequest).token = payload;

    next();
  } catch (error) {
    next(error);
  }
};
