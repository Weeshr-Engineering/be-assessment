import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { UnauthorizedError } from "../middlewares/errorhandler";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const authMiddleware = () => {
  const secret = process.env.JWT_SECRET as Secret;
  console.log("touched");
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        throw new UnauthorizedError("No token provided");
      }

      const payload = jwt.verify(token, secret) as JwtPayload;

      (req as CustomRequest).token = payload;

      next();
    } catch (error) {
      next(new UnauthorizedError("Invalid token"));
    }
  };
};
