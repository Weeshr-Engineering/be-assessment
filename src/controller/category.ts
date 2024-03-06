import { Request, Response } from "express";
import Category from "../model/categoryModel";
import { categorySchema } from "../validation/validation";

// Create a new category
export const addCategory = async (req: Request, res: Response) => {
  try {
    const validateCategory = categorySchema.parse(req.body);

    const { description, genre } = validateCategory;

    if (!description || !genre) {
      return res.status(400).json({
        message: "Kindly provide all required fields",
      });
    }
    const createNewCategory = await Category.create({
      description,
      genre,
    });

    res.status(201).json({
      message: "Well-done! Category added successfully",
      createNewCategory,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

// Get a list of all categories
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const getCategories = await Category.findAll();

    return res.status(200).json({ getCategories});
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

// Get one category by id
export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const getCategory = await Category.findByPk(id);

    if (!getCategory) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    return res.status(200).json({ getCategory });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

// Update a category by id
export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedCategory = await Category.update(req.body, {
      where: { id },
    });

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({
      message: "Category updated successfully",
      updatedCategory,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

// Delete a category by id 
export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedCategory = await Category.destroy({
      where: { id },
    });

    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({
      message: "Category deleted successfully",
      deletedCategory,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};