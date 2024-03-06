import mongoose from "mongoose";
import Joi from "joi";

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        minlength: 5,
        required: true
    }
})

const Category = mongoose.model('Category', categorySchema)

// Joi validator
interface categoryDets {
    categoryName: string
}
function validateCategory(category: categoryDets) {
    const schema = Joi.object({
        categoryName: Joi.string().min(5).required()
    })
    return schema.validate(category)
}

export { Category, validateCategory }