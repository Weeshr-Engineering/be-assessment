"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookData = void 0;
const zod_1 = require("zod");
// Define the schema for the book attributes
const bookData = (0, zod_1.object)({
    Title: (0, zod_1.string)(),
    datePublished: (0, zod_1.string)(), // Consider using `Date` type instead
    Description: (0, zod_1.string)(),
    pageCount: (0, zod_1.number)(),
    Genre: (0, zod_1.string)(),
    Publisher: (0, zod_1.string)(),
    authorId: (0, zod_1.string)(), // Consider using proper author reference or ID type
});
exports.bookData = bookData;
