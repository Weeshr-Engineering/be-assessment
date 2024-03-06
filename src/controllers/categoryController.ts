// src/controllers/categoryController.ts
import { Request, Response } from "express";
import Category, { ICategory } from "../models/categoryModel";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category: ICategory = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const { sortBy, sortOrder, page, limit } = req.query;
    let query = Category.find();

    // Sorting

    // using name or description to sort the list
    if (sortBy && ["name", "description"].includes(sortBy.toString())) {
      //makes sure the list is sorted either  in desc or ascending
      const sortOrderValue = sortOrder === "desc" ? -1 : 1;
      query = query.sort({ [sortBy.toString()]: sortOrderValue });
    }

    // Pagination
    const pageNumber = parseInt(page as string, 10) || 1;
    const limitNumber = parseInt(limit as string, 10) || 10;
    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = pageNumber * limitNumber;
    const total = await Category.countDocuments();

    query = query.skip(startIndex).limit(limitNumber);

    const categories: ICategory[] = await query;

    // Pagination result
    const paginationResult: any = {};
    if (endIndex < total) {
      paginationResult.next = {
        page: pageNumber + 1,
        limit: limitNumber,
      };
    }

    if (startIndex > 0) {
      paginationResult.prev = {
        page: pageNumber - 1,
        limit: limitNumber,
      };
    }

    res.json({
      pagination: paginationResult,
      data: categories,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    const category: ICategory | null = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(updatedCategory);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
