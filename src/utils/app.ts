import express from 'express';
import cookieParser from 'cookie-parser'

import categoryRoute from '../Routes/category'
import authorRoute from '../Routes/author'
import bookRoute from '../Routes/book'
import userRoute from '../Routes/users'
import { requireAuth } from '../Middleware/auth';


function createServer() {
    const JWT_KEY: string = process.env.JWT_KEY || '';

    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser(JWT_KEY))

    //Routes
    app.use('/api/category', requireAuth, categoryRoute)
    app.use('/api/author', requireAuth, authorRoute)
    app.use('/api/book', bookRoute)
    app.use('/api/user', userRoute)
    
    return app
}

export default createServer