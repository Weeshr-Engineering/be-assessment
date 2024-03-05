import { Schema, model } from 'mongoose'

const bookSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    author: [{
      type: Schema.Types.ObjectId,
      ref: 'Author',
      required: true,
    }],
    description: {
      type: String
    },
    category: [{
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    }],
    publicationYear: {
      type: Number
    },
    isbn: {
      type: String,
      max: 13,
      required: true,
      unique: true,
    }
})

export const Book = model('book', bookSchema)
