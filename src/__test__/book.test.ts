import supertest from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { Book } from '../Models/books';
import createServer from '../utils/app';


const app = createServer()

const authorId = new mongoose.Types.ObjectId().toString()
const categoryId = new mongoose.Types.ObjectId().toString()

const bookPayload =  {
    title: 'Mock Book 1',
    author: [authorId],
    category: [categoryId],
    publicationYear: '2022',
    isbn: '1234567890'
}

describe('book', () => {

    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create()

        await mongoose.connect(mongoServer.getUri())
    })

    afterAll(async () => {
        await mongoose.disconnect()
        await mongoose.connection.close()
    })

    describe('get book route', () => {
        describe('given the book does not exist', () => {
            it('should retun a 404', async () => {
                const bookId = 'book-123'
                await supertest(app).get(`/api/book/${bookId}`).expect(404)
            })
        }) 
    })
    describe('get book route', () => {
        describe('given the book does exist', () => {
            it('should return a 200 status and the book', async () => {
                // Create the book in the database and obtain its _id
                const createdBook = await Book.create(bookPayload);
                const bookId = createdBook._id;
    
                // Make a request to the route to retrieve the book
                const response = await supertest(app).get(`/api/book/${bookId}`);
    
                // Verify the response status code
                // expect(response.status).toBe(200);
    
                // Verify the returned book matches the expected book
                expect(response.body.title).toBe(bookPayload.title);
                expect(response.body.author).toEqual(expect.arrayContaining(bookPayload.author));
                expect(response.body.category).toEqual(expect.arrayContaining(bookPayload.category));
                expect(response.body.publicationYear).toBe(bookPayload.publicationYear);
                expect(response.body.isbn).toBe(bookPayload.isbn);
            })
        }) 
    })
}) 