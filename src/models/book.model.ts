import { Schema, model } from 'mongoose'

const bookSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    author: {
      // Reference
      type: String
    },
    description: {
      type: String
    },
    category: {
      // Reference
      type: String
    },
    purchaseCount: {
      type: Number
    },
    publicationYear: {
      type: Number
    },
    isbn: {
      type: String
    }
})

const Book = model('book', bookSchema)

export { Book }