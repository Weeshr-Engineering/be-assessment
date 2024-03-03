import { Router } from 'express';
const router = Router();
import { getAuthor, getAuthors, createAuthor, updateAuthor, deleteAuthor } from "../Controllers/authorCtrl";

//GET all Authors
router.get('/', getAuthors)

//GET one Author
router.get('/:id', getAuthor)

//POST Author
router.post('/', createAuthor)

//DELETE one Author
router.delete('/:id', deleteAuthor)

//UPDATE one Author
router.put('/:id', updateAuthor)


export default router;