import express from 'express';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategory
} from '../controller/categories';

const router = express.Router();

router.post('/create', createCategory);
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.put('/:id', updateCategoryById);
router.delete('/:id', deleteCategory);

export default router;
