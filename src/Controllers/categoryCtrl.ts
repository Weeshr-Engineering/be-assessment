import { Request, Response } from 'express'
import { Category, validateCategory } from '../Models/categories'
import mongoose from 'mongoose';


const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find();
        res.status(200).send(categories);
    } catch (error) {
        res.status(500).json({message:"Error retrieving categories"});
    }
}

const getCategory = async (req: Request, res: Response) => {

    const { id } = req.params

    //mongoose ID validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: "Invalid ID"})
    }
    try {
        let category = await Category.findById(id)
        if (!category) return res.status(404).json({message:'category with ID not found'})
        res.status(200).send(category)
    } catch (error) {
        res.status(500).json({message: "Error retrieving category"});
    }
}

const createCategory = async (req: Request, res: Response) => {

    //Joi validation
    const { error } = validateCategory(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    
    const { categoryName } = req.body;


    const existingCategory = await Category.findOne({ categoryName });
    if (existingCategory) return res.status(400).json({message: "Category already exists"})

    try {
        const category = await Category.create({ categoryName })
        res.status(200).json({message: "Category created!"});
    } catch {
        res.status(500).json({message: "Error creating category"});
    }
}

const updateCategory = async (req: Request, res: Response) => {

    //Joi validation
    const { error } = validateCategory(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const { id } = req.params

    //mongoose ID validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: "Invalid ID"})
    }
    try {
        const category = await Category.findByIdAndUpdate(id, {...req.body})
        res.status(200).json({message: "Category successfully updated!"});
    }
    catch(error) {
        res.status(500).json({message: "Error updating category"});
    }
}

const deleteCategory = async (req: Request, res: Response) => {

    const { id } = req.params

    //mongoose ID validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: "Invalid ID"})
    }
    try {
        const category = await Category.findByIdAndDelete(id, {...req.body})
        res.status(200).json({message: "Category successfully deleted!"});
    }
    catch(error) {
        res.status(500).json({message: "Error deleting category"});
    }
}


export { getCategories, getCategory, createCategory, updateCategory, deleteCategory };