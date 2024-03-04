import { Request, Response, NextFunction, RequestHandler } from "express";

import prisma from "../utils/prisma";

import { ResponseHandler } from "../utils/responseHandler";

import {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  InternalServerError,
} from "../middlewares/errorhandler";

export const createBook: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, authorId, publication_year, isbn, categoryId } = req.body;

    const book = await prisma.book.create({
      data: {
        title,
        publication_year,
        isbn,
        authorId: parseInt(authorId),
        categoryId: parseInt(categoryId),
      },
      select: {
        id: true,
        title: true,
        publication_year: true,
        isbn: true,
        authorId: true,
        categoryId: true,
        created_at: true,
        updated_at: true,
      },
    });

    ResponseHandler.success(res, book, 201, "Book created successfully");
  } catch (error) {
    next(error);
  }
};

export const getBooks: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const books = await prisma.book.findMany({
      include: {
        Category: true,
      },
    });

    if (!books) {
      throw new NotFoundError("No books found");
    }

    ResponseHandler.success(res, books, 200, "Books retrieved successfully");
  } catch (error) {
    next(error);
  }
};

export const getBook: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params;

    const book = await prisma.book.findUnique({
      where: {
        id: parseInt(bookId),
      },
      include: {
        Category: true,
      },
    });

    if (!book) {
      throw new NotFoundError("Book not found");
    }

    ResponseHandler.success(res, book, 200, "Book retrieved successfully");
  } catch (error) {
    next(error);
  }
};

export const updateBook: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params;

    const { title, authorId, publication_year, isbn, categoryId } = req.body;

    const book = await prisma.book.update({
      where: {
        id: parseInt(bookId),
      },
      data: {
        title,
        publication_year,
        isbn,
        authorId: parseInt(authorId),
        categoryId: parseInt(categoryId),
      },
      select: {
        id: true,
        title: true,
        publication_year: true,
        isbn: true,
        authorId: true,
        created_at: true,
        updated_at: true,
      },
    });

    ResponseHandler.success(res, book, 200, "Book updated successfully");
  } catch (error) {
    next(error);
  }
};

export const deleteBook: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params;

    const book = await prisma.book.delete({
      where: {
        id: parseInt(bookId),
      },
    });

    ResponseHandler.success(res, book, 200, "Book deleted successfully");
  } catch (error) {
    next(error);
  }
};
