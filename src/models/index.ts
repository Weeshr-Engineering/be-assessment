import 'dotenv/config';
import Mongoose  from 'mongoose';

const {
 MONGO_DB_URL
} = process.env;

Mongoose.connect(MONGO_DB_URL, { keepAlive: true });

export default Mongoose;