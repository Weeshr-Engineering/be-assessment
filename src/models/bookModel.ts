import mongoose, { Schema, Document } from "mongoose";

export interface Book extends Document {
  title: string;
  author: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId;
  categoryName: string;
  publicationYear: number;
  ISBN: string;
}

const bookSchema: Schema<Book> = new Schema<Book>(
  {
    title: {
      type: String,
      required: [true, "Please enter Book Title"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    categoryName: {
      type: String,
      required: true,
    },
    publicationYear: {
      type: Number,
      required: [true, "Please enter a Publication Year"],
    },
    ISBN: {
      type: String,
      trim: true,
      required: [true, "Please Provide ISBN"],
    },
  },
  { timestamps: true }
);

export const BookModel = mongoose.model<Book>("Book", bookSchema);
