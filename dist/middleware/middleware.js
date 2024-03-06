"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware to check if the request has a valid token
const authorize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Get the token from the request header
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }
        // Verify the token using your secret key
        const secret = process.env.secret;
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        // Here, you don't need to query the database again as you already have the decoded token
        // Set the user ID from the decoded token to req.user for use in subsequent middleware
        req.user = { id: decoded.loginkey };
        // Continue to the next middleware or route handler
        next();
    }
    catch (error) {
        // Log the error for debugging purposes
        console.error('Authorization Error:', error);
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
});
exports.authorize = authorize;
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
