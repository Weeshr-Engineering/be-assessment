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
const app_1 = __importDefault(require("../utils/app"));
// // Mock the Book model
// jest.mock('../Models/books', () => ({
//     Book: {
//         find: jest.fn(),
//     },
// }));
const app = (0, app_1.default)();
// describe('GET /api/book', () => {
//     it('responds with books when Book.find succeeds', async () => {
//         // Mock the find method of the Book model to return mock books
//         const mockBooks = [
//             {
//                 title: 'Mock Book 1',
//                 author: ['Author 1', 'Author 2'],
//                 category: ['Category 1', 'Category 2'],
//                 publicationYear: '2022',
//                 isbn: '1234567890'
//             },
//             // Add more mock books as needed
//         ];
//         (Book.find as jest.Mock).mockReturnValueOnce(mockBooks);
//         // Make a request to the route
//         const response = await request(app).get('/api/book');
//         // Check that the route sends the correct response
//         // expect(response.status).toBe(200);
//         expect(response.body).toEqual(mockBooks);
//     });
//     it('responds with an error message when Book.find fails', async () => {
//         // Mock the find method of the Book model to throw an error
//         const errorMessage = 'Database error';
//         (Book.find as jest.Mock).mockRejectedValue(new Error(errorMessage));
//         // Make a request to the route
//         const response = await request(app).get('/api/book');
//         // Check that the route sends the correct error response
//         // expect(response.status).toBe(500);
//         expect(response.body).toEqual({ message: 'Error retrieving Books' });
//     });
// });
describe('book', () => {
    describe('get book route', () => {
        describe('given the books doesnt exist', () => {
            it('should retun a 404', () => __awaiter(void 0, void 0, void 0, function* () {
                const bookId = 'book-123';
                yield (0, supertest_1.default)(app).get(`/api/book/${bookId}`).expect(404);
            }));
        });
    });
});
