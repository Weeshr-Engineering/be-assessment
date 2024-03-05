import { Request, Response } from 'express'
import { Book, validateBook } from '../Models/books'
import mongoose from 'mongoose';


const getBooks = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1; 
    const limit = parseInt(req.query.limit as string) || 10;
    try {

        const totalBooks = await Book.countDocuments();
        const totalPages = Math.ceil(totalBooks / limit);

        const books = await Book.find()
        .populate(['author', 'category'])
        .skip((page - 1) * limit) 
        .limit(limit);
        res.status(200).json({
            books,
            currentPage: page,
            totalPages
        });
    } catch (error) {
        res.status(500).json({message:"Error retrieving Books"});
    }
}

const getBook = async (req: Request, res: Response) => {

    const { id } = req.params

    //mongoose ID validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: "Invalid ID"})
    }
    try {
        let book = await Book.findById(id).populate(['author', 'category'])
        if (!book) return res.status(404).json({message:'Book with ID not found'})
        res.status(200).send(book)
    } catch (error) {
        res.status(500).json({message: "Error retrieving Book"});
    }
}

const createBook = async (req: Request, res: Response) => {
    
    //Joi validation
    const { error } = validateBook(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const { title, author, category, publicationYear, isbn } = req.body;

    const existingBook = await Book.findOne({  title, author, category, publicationYear, isbn  });
    if (existingBook) return res.status(400).json({message: "Book already exists"})

    try {
        const book = await Book.create({  title, author, category, publicationYear, isbn  })
        res.status(200).json({message: "Book created!"});
    } catch {
        res.status(500).json({message: "Error creating Book"});
    }
}

const updateBook = async (req: Request, res: Response) => {

    //Joi validation
    const { error } = validateBook(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const { id } = req.params

    //mongoose ID validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: "Invalid ID"})
    }
    try {
        const book = await Book.findByIdAndUpdate(id, {...req.body})
        res.status(200).json({message: "Book successfully updated!"});
    }
    catch(error) {
        res.status(500).json({message: "Error updating Book"});
    }
}

const deleteBook = async (req: Request, res: Response) => {

    const { id } = req.params

    //mongoose ID validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: "Invalid ID"})
    }
    try {
        const book = await Book.findByIdAndDelete(id, {...req.body})
        res.status(200).json({message: "Book successfully deleted!"});
    }
    catch(error) {
        res.status(500).json({message: "Error deleting Book"});
    }
}


export { getBooks, getBook, createBook, updateBook, deleteBook };