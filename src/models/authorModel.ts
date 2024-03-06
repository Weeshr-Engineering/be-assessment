// src/models/authorModel.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IAuthor extends Document {
  name: string;
  bio: string;
}

const AuthorSchema: Schema = new Schema({
  name: { type: String, required: true },
  bio: { type: String },
});

export default mongoose.model<IAuthor>("Author", AuthorSchema);
