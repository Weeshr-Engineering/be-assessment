import { Request, Response } from 'express'
import { Author, validateAuthor } from '../Models/author'
import mongoose from 'mongoose';


const getAuthors = async (req: Request, res: Response) => {
    try {
        const authors = await Author.find();
        res.status(200).send(authors);
    } catch (error) {
        res.status(500).json({message:"Error retrieving Authors"});
    }
}

const getAuthor = async (req: Request, res: Response) => {

    const { id } = req.params

    //mongoose ID validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: "No such product"})
    }
    try {
        let author = await Author.findById(id)
        if (!author) return res.status(404).json({message:'Author with ID not found'})
        res.status(200).send(author)
    } catch (error) {
        res.status(500).json({message: "Error retrieving Author"});
    }
}

const createAuthor = async (req: Request, res: Response) => {

    const { firstName, lastName } = req.body;

    //Joi validation
    const { error } = validateAuthor(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const existingAuthor = await Author.findOne({ firstName, lastName });
    if (existingAuthor) return res.status(400).json({message: "Author already exists"})

    try {
        const author = await Author.create({ firstName, lastName })
        res.status(200).json({message: "Author created!"});
    } catch {
        res.status(500).json({message: "Error creating Author"});
    }
}

const updateAuthor = async (req: Request, res: Response) => {

    //Joi validation
    const { error } = validateAuthor(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const { id } = req.params

    //mongoose ID validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No such product")
    }
    try {
        const author = await Author.findByIdAndUpdate(id, {...req.body})
        res.status(200).json({message: "Author successfully updated!"});
    }
    catch(error) {
        res.status(500).json({message: "Error updating Author"});
    }
}

const deleteAuthor = async (req: Request, res: Response) => {

    const { id } = req.params

    //mongoose ID validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No such product")
    }
    try {
        const author = await Author.findByIdAndDelete(id, {...req.body})
        res.status(200).json({message: "Author successfully deleted!"});
    }
    catch(error) {
        res.status(500).json({message: "Error deleting Author"});
    }
}


export { getAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor };