import mongoose from "mongoose";
import Joi from "joi";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 5,
        required: true
    },
    author: [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    }],
    category: [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }],
    publicationYear: {
        type: Date,
        required: true
    },
    isbn: {
        type: Number,
        min: 10,
        max: 13,
        required: true,
        unique: true
    }
})

const Book = mongoose.model('Book', bookSchema)

// Joi validator
function validateBook(book: String) {
    const schema = Joi.object({
        title: Joi.string().min(5).required(),
        author: Joi.array().required(),
        category: Joi.array().required(),
        publicationYear: Joi.date().required(),
        isbn: Joi.number().min(10).max(13).required()
    })
    return schema.validate(book)
}

export { Book, validateBook }