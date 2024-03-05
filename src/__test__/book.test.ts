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
                
                const createdBook = await Book.create(bookPayload);
                const bookId = createdBook._id;
    
                const response = await supertest(app).get(`/api/book/${bookId}`);
    
                expect(response.status).toBe(200);
    
                
                expect(response.body.title).toBe(bookPayload.title);
                expect(response.body.author).toEqual(expect.arrayContaining(bookPayload.author));
                expect(response.body.category).toEqual(expect.arrayContaining(bookPayload.category));
                expect(response.body.publicationYear).toBe(bookPayload.publicationYear);
                expect(response.body.isbn).toBe(bookPayload.isbn);
            })
        }) 
    })
}) 