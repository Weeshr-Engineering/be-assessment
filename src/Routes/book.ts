import { Router } from 'express';
const router = Router();
import { getBook, getBooks, createBook, updateBook, deleteBook } from "../Controllers/bookCtrl";

//GET all Books
router.get('/', getBooks)

//GET one Book
router.get('/:id', getBook)

//POST Book
router.post('/', createBook)

//DELETE one Book
router.delete('/:id', deleteBook)

//UPDATE one Book
router.put('/:id', updateBook)


export default router;