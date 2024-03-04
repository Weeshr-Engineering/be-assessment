import { Schema, model } from 'mongoose'

const authorSchema = new Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    middleName: {
      type: String
    },
})

const Author = model('author', authorSchema)

export { Author }