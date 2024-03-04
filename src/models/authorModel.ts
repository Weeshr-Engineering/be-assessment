import mongoose, { Schema, Document } from "mongoose";

export interface Author extends Document {
  name: string;
  email: string;
  password: string;
  bio?: string;
}

const authorSchema: Schema<Author> = new Schema<Author>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please enter your Name"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Please enter your email"],
      validate: {
        validator: function (str: string) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(str);
        },
        message: (props) => `${props.value} is not a valid email`,
      },
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Please add a password "],
    },
    bio: {
      type: String,
    },
  },
  { timestamps: true }
);

export const AuthorModel = mongoose.model<Author>("Author", authorSchema);
