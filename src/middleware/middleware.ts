import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import user from '../model/user';

// Define a custom interface to extend the Request type
interface AuthRequest extends Request {
  user?: {id:string}; // Add the userId property to the Request type
}

// Middleware to check if the request has a valid token

export const authorize = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Get the token from the request header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Verify the token using your secret key
    const secret: any = process.env.secret;

    const decoded: any = jwt.verify(token, secret);

    // Here, you don't need to query the database again as you already have the decoded token
    // Set the user ID from the decoded token to req.user for use in subsequent middleware
    req.user = { id: decoded.loginkey };

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Authorization Error:', error);
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};






// export const authorize = async (req: AuthRequest, res: Response, next: NextFunction)  => {

//   // Get the token from the request header or other sources
//   const token = req.header('Authorization')?.replace('Bearer', '');

//   if (!token) {
//     res.status(401).json({ message: 'Unauthorized: No token provided' });
//     return;
//   }

//   try {
//     // Verify the token using your secret key
//     const secret: any = process.env.secret

//     const decoded = jwt.verify(token, secret) as { loginkey: string };

//     const userId = await user.findOne({
//       where: {id: decoded.loginkey },attributes:['id'],
//     });

//     if (!userId){
//       res.status(401).json({message: 'unauthorized'});
//     return;
//     }
//     // Attach the decoded user ID to the request for further use
//     req.user = {id: user.dataValues.id}

//     // Continue to the next middleware or route handler
//     next();

//   } catch (error) {
//     res.status(401).json({ message: 'Unauthorized: Invalid token' });
//   }
// };





