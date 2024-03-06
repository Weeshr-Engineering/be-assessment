import { Date, Schema, model } from "mongoose";

// Creating an interface representing a document in MongoDB.
interface IAuthor {
  name: String;
  dateOfBirth: Date;
}

// Creating a Schema corresponding to the document interface.
const authorSchema = new Schema<IAuthor>({
  name: { type: String, required: true },
  dateOfBirth: { type: Date },
});

// Creating and exporting the book Model to be used in book controllers.
export const AuthorModel = model<IAuthor>("Author", authorSchema);
