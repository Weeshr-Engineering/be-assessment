import request from 'supertest';
import { Response } from 'express';
import { Book } from '../Models/books';
import createServer from '../utils/app';

// Mock the Book model
jest.mock('../Models/books');

const app = createServer()

describe('GET /api/book', () => {
    it('responds with books when Book.find succeeds', async () => {
        // Mock the find method of the Book model to return mock books
        const mockBooks = [
            {
                title: 'Mock Book 1',
                author: ['Author 1', 'Author 2'],
                category: ['Category 1', 'Category 2'],
                publicationYear: 2022,
                isbn: '1234567890'
            },
            // Add more mock books as needed
        ];
        (Book.find as jest.Mock).mockResolvedValue(mockBooks);

        // Make a request to the route
        const response = await request(app).get('/api/book');

        // Check that the route sends the correct response
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockBooks);
    });

    it('responds with an error message when Book.find fails', async () => {
        // Mock the find method of the Book model to throw an error
        const errorMessage = 'Database error';
        (Book.find as jest.Mock).mockRejectedValue(new Error(errorMessage));

        // Make a request to the route
        const response = await request(app).get('/api/book');

        // Check that the route sends the correct error response
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: 'Error retrieving Books' });
    });
});
