import { Schema, model } from 'mongoose'

const categorySchema = new Schema({
    name: {
      type: String,
      required: true
    }
})

export interface categoryInterface {
  name: string,
}

export const Category = model('category', categorySchema)
