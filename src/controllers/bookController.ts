// src/controllers/bookController.ts
import { Request, Response } from "express";
import Book, { IBook } from "../models/bookModel";

export const createBook = async (req: Request, res: Response) => {
  try {
    const book: IBook = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const { sortBy, sortOrder, page, limit } = req.query;
    let query = Book.find();
    // .populate("author", "name")
    // .populate("category", "name");

    // Sorting
    if (
      sortBy &&
      ["title", "author", "category", "publicationYear"].includes(
        sortBy.toString()
      )
    ) {
      const sortOrderValue = sortOrder === "desc" ? -1 : 1;
      query = query.sort({ [sortBy.toString()]: sortOrderValue });
    }

    // Pagination
    const pageNumber = parseInt(page as string, 10) || 1;
    const limitNumber = parseInt(limit as string, 10) || 10;
    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = pageNumber * limitNumber;
    const total = await Book.countDocuments();

    query = query.skip(startIndex).limit(limitNumber);

    const books: IBook[] = await query;

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

    res.status(200).json({
      pagination: paginationResult,
      data: books,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getBook = async (req: Request, res: Response) => {
  try {
    const book: IBook | null = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(201).json(updatedBook);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
