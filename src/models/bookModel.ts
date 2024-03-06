// src/models/bookModel.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  category: string;
  publicationYear: number;
  ISBN: string;
}

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  publicationYear: { type: Number, required: true },
  ISBN: { type: String, required: true, unique: true },
});

export default mongoose.model<IBook>("Book", BookSchema);
