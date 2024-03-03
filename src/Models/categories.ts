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
function validateCategory(category: String) {
    const schema = Joi.object({
        categoryName: Joi.string().min(5).required()
    })
    return schema.validate(category)
}

export { Category, validateCategory }