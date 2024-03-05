import express from 'express';
import cookieParser from 'cookie-parser'

function createServer() {
    const JWT_KEY: string = process.env.JWT_KEY || '';

    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser(JWT_KEY))

    return app
}

export default createServer