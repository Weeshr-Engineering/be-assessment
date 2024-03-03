import { Router } from 'express';
const router = Router();
import { getCategory, getCategories, createCategory, updateCategory, deleteCategory } from "../Controllers/categoryCtrl";

//GET all Categories
router.get('/', getCategories)

//GET one Category
router.get('/:id', getCategory)

//POST Category
router.post('/', createCategory)

//DELETE one Category
router.delete('/:id', deleteCategory)

//UPDATE one Category
router.put('/:id', updateCategory)


export default router;