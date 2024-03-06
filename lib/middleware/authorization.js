"use strict";
// import { Request, Response, NextFunction } from "express";
// import Author from "../model/authorModel";
// import jwt from "jsonwebtoken";
// interface AuthRequest extends Request {
//   author?: any;
// }
// export const authorize = async (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authHeader = req.header("Authorization")?.replace("Bearer ", "");
//   if (!authHeader) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
//   const token = authHeader.split(" ")[1];
// //   jwt.verify(authHeader, 'your-secret-key', (err, decoded) => {
// //     if (err) return res.status(403).send('Invalid token');
// //     req.author = decoded as Author;
// //     next();
// // })
//   try {
//     const secret = process.env.secret;
//     if (!secret) {
//       return res.status(500).json({ message: "Internal Server Error" });
//     }
//     const decoded = jwt.verify(token, secret) as {id:string};
//     const author = await Author.findOne({ where: { id: decoded.id },attributes: ['id'] });
//     if (!author) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }
//     req.author = author;
//     next();
//   } catch (error:any) {
//     if (error instanceof jwt.JsonWebTokenError) {
//       return res.status(403).json({ message: "Invalid token" });
//     } else {
//       return res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
//   }
// };
