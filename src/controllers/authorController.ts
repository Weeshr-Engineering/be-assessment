// src/controllers/authorController.ts
import { Request, Response } from "express";
import Author, { IAuthor } from "../models/authorModel";

export const createAuthor = async (req: Request, res: Response) => {
  try {
    const author: IAuthor = new Author(req.body);
    await author.save();
    res.status(201).json(author);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAuthors = async (req: Request, res: Response) => {
  try {
    const { sortBy, sortOrder, page, limit } = req.query;
    let query = Author.find();

    // Sorting
    // using name or description to sort the list
    if (sortBy && ["name"].includes(sortBy.toString())) {
      //makes sure the list is sorted either  in desc or ascending
      const sortOrderValue = sortOrder === "desc" ? -1 : 1;
      query = query.sort({ [sortBy.toString()]: sortOrderValue });
    }

    // Pagination
    const pageNumber = parseInt(page as string, 10) || 1;
    const limitNumber = parseInt(limit as string, 10) || 10;
    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = pageNumber * limitNumber;
    const total = await Author.countDocuments();

    query = query.skip(startIndex).limit(limitNumber);

    const authors: IAuthor[] = await query;

    // Pagination result
    const paginationResult = {} as any;
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
      data: authors,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAuthor = async (req: Request, res: Response) => {
  try {
    const author: IAuthor | null = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.json(author);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedAuthor = await Author.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedAuthor) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.json(updatedAuthor);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedAuthor = await Author.findByIdAndDelete(id);
    if (!deletedAuthor) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.json({ message: "Author deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
