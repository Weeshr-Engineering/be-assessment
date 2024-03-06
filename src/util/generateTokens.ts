import Jwt from "jsonwebtoken";
import { AuthorModel } from "../models/authorModel";

export const generateToken = (id: string): any => {
  return Jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}; 

