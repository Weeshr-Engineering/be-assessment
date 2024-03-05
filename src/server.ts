import mongoose from 'mongoose';
import dotenv from 'dotenv';
import createServer from './utils/app';

dotenv.config();

const app = createServer()

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
