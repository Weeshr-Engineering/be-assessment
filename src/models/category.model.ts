import { Schema, model } from 'mongoose'

const categorySchema = new Schema({
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

const Category = model('category', categorySchema)

export { Category }