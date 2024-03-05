import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import categoryRoute from './Routes/category'
import authorRoute from './Routes/author'
import bookRoute from './Routes/book'
import userRoute from './Routes/users'
import { requireAuth } from './Middleware/auth';

dotenv.config();

const JWT_KEY: string = process.env.JWT_KEY || '';

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(JWT_KEY))

//Connecting to database
const MONGO_URI: string = process.env.MONGO_URI || '';
const PORT: number = parseInt(process.env.PORT || '3000');

mongoose.connect(MONGO_URI)
.then(() => {
    app.listen(PORT, () => {console.log('Listening on port', process.env.PORT)})
})
.catch((error) => console.log(error))


//logger
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


//Routes
app.use('/api/category', requireAuth, categoryRoute)
app.use('/api/author', requireAuth, authorRoute)
app.use('/api/book', requireAuth, bookRoute)
app.use('/api/user', userRoute)
