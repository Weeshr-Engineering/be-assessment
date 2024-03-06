import { Schema, model } from "mongoose";
import { ObjectId } from "mongodb";

// Creating an interface representing a document in MongoDB.
interface IBook {
  id?: ObjectId;
  title: String;
  author: String;
  yearPublished: Number;
  isbn: String;
}

// Creating a Schema corresponding to the document interface.
const bookSchema = new Schema<IBook>({
  id: { type: ObjectId },
  title: { type: String, required: true },
  author: { type: String },
  yearPublished: { type: Number, required: true },
  isbn: { type: String, required: true },
});

// Creating and exporting the book Model to be used in book controllers.
export const BookModel = model<IBook>("Book", bookSchema);
