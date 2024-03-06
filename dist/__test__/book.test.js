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
const supertest_1 = __importDefault(require("supertest"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
const books_1 = require("../Models/books");
const app_1 = __importDefault(require("../utils/app"));
const app = (0, app_1.default)();
const authorId = new mongoose_1.default.Types.ObjectId().toString();
const categoryId = new mongoose_1.default.Types.ObjectId().toString();
const bookPayload = {
    title: 'Mock Book 1',
    author: [authorId],
    category: [categoryId],
    publicationYear: '2022',
    isbn: '1234567890'
};
describe('book', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        yield mongoose_1.default.connect(mongoServer.getUri());
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        yield mongoose_1.default.connection.close();
    }));
    describe('get book route', () => {
        describe('given the book does not exist', () => {
            it('should retun a 404', () => __awaiter(void 0, void 0, void 0, function* () {
                const bookId = 'book-123';
                yield (0, supertest_1.default)(app).get(`/api/book/${bookId}`).expect(404);
            }));
        });
    });
    describe('get book route', () => {
        describe('given the book does exist', () => {
            it('should return a 200 status and the book', () => __awaiter(void 0, void 0, void 0, function* () {
                const createdBook = yield books_1.Book.create(bookPayload);
                const bookId = createdBook._id;
                const response = yield (0, supertest_1.default)(app).get(`/api/book/${bookId}`);
                expect(response.status).toBe(200);
                expect(response.body.title).toBe(bookPayload.title);
                expect(response.body.author).toEqual(expect.arrayContaining(bookPayload.author));
                expect(response.body.category).toEqual(expect.arrayContaining(bookPayload.category));
                expect(response.body.publicationYear).toBe(bookPayload.publicationYear);
                expect(response.body.isbn).toBe(bookPayload.isbn);
            }));
        });
    });
});
