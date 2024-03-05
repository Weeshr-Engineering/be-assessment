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

export interface authorInterface {
  firstName: string,
  lastName: string,
  middleName: string,
}

export const Author = model('author', authorSchema);
