import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import categoryRoute from './Routes/category'
import authorRoute from './Routes/author'
import bookRoute from './Routes/book'

dotenv.config();


const app = express();
app.use(express.json())

app.use(express.urlencoded({ extended: true }));

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
app.use('/api/category', categoryRoute)
app.use('/api/author', authorRoute)
app.use('/api/book', bookRoute)
