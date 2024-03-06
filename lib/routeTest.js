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
const express_1 = __importDefault(require("express"));
const authorRouter_1 = __importDefault(require("./src/routes/authorRouter"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/author", authorRouter_1.default);
describe("Author Routes", () => {
    let authorId;
    it("should add a new author", () => __awaiter(void 0, void 0, void 0, function* () {
        const newAuthorData = {
            fullName: "John Doe",
            email: "john@example.com",
            password: "password123",
            confirmPassword: "password123",
        };
        const response = yield (0, supertest_1.default)(app)
            .post("/author/addAuthor")
            .send(newAuthorData);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("createNewAuthor");
        expect(response.body.createNewAuthor).toHaveProperty("id");
        authorId = response.body.createNewAuthor.id;
    }));
    it("should get all authors", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/author/allAuthors");
        expect(response.status).toBe(200);
        // Add more assertions as needed
    }));
    it("should get a specific author by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        if (!authorId) {
            fail("Author ID not set");
        }
        const response = yield (0, supertest_1.default)(app).get(`/author/getAuthorById/${authorId}`);
        expect(response.status).toBe(200);
        // Add more assertions as needed
    }));
    it("should update an author", () => __awaiter(void 0, void 0, void 0, function* () {
        if (!authorId) {
            fail("Author ID not set");
        }
        const updatedAuthorData = {
            fullName: "Updated Name",
        };
        const response = yield (0, supertest_1.default)(app)
            .put(`/author/updateAuthor/${authorId}`)
            .send(updatedAuthorData);
        expect(response.status).toBe(200);
    }));
    it("should delete an author", () => __awaiter(void 0, void 0, void 0, function* () {
        if (!authorId) {
            fail("Author ID not set");
        }
        const response = yield (0, supertest_1.default)(app).delete(`/author/deleteAuthor/${authorId}`);
        expect(response.status).toBe(200);
    }));
});
