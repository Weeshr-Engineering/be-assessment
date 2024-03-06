// Example user authentication middleware
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trimLeft();
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key");
    req.userId = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
