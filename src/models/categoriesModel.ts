import mongoose, { Schema, Document } from "mongoose";

export interface Category extends Document {
  name: string;
  description: string;
}

const categorySchema: Schema<Category> = new Schema<Category>({
  name: {
    type: String,
    required: [true, "Please give a category name"],
  },
  description: {
    type: String,
    required: [true, "A short description would be nice"],
  },
});

export const CategoryModel = mongoose.model<Category>(
  "Categories",
  categorySchema
);
