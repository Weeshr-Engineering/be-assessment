import { Request, Response } from 'express';
import Category, { ICategory } from '../model/categories';

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { categoryName, categoryDetails } = req.body;

    const newCategory: ICategory = new Category({
      categoryName,
      categoryDetails,
    });

    const savedCategory: ICategory = await newCategory.save();

    res.status(201).json({
      status: 'success',
      message: 'Category created successfully',
      category: savedCategory,
    });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories: ICategory[] = await Category.find({});
    res.status(200).json({ categories });
  } catch (error) {
    console.error('Error getting categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const categoryId: string = req.params.id;
    const category: ICategory | null = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ category });
  } catch (error) {
    console.error('Error getting category by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateCategoryById = async (req: Request, res: Response) => {
  try {
    const categoryId: string = req.params.id;
    const { categoryName, categoryDetails } = req.body;

    const updatedCategory: ICategory | null = await Category.findByIdAndUpdate(
      categoryId,
      { categoryName, categoryDetails },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const categoryId: string = req.params.id;

    const deletedCategory: ICategory | null = await Category.findOneAndDelete({ _id: categoryId });

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully', category: deletedCategory });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
