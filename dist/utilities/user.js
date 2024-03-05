"use strict";
// export async function registerValidator(){
//     // do validation
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.userData = void 0;
// validation.ts
const zod_1 = require("zod");
// Create the user schema using Zod
exports.userData = (0, zod_1.object)({
    authorName: (0, zod_1.string)(),
    email: (0, zod_1.string)().email(),
    password: (0, zod_1.string)().min(8),
    phoneNumber: (0, zod_1.string)().min(11),
});
exports.default = exports.userData;
