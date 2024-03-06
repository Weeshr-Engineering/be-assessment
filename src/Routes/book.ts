import { Router } from 'express';
const router = Router();
import { getBook, getBooks, createBook, updateBook, deleteBook } from "../Controllers/bookCtrl";
import { requireAuth } from '../Middleware/auth';


//GET all Books
router.get('/', getBooks)

//GET one Book
router.get('/:id', getBook)

//POST Book
router.post('/', requireAuth, createBook)

//DELETE one Book
router.delete('/:id', requireAuth, deleteBook)

//UPDATE one Book
router.put('/:id', requireAuth, updateBook)


export default router;