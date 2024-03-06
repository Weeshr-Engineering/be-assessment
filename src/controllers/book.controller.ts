import { Request, Response, NextFunction, RequestHandler } from "express";
import { APIResponse } from "../utils/response";
import { BookService } from "../services/book.service";

export const addBook: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await BookService.create(req.body);

    APIResponse.success(res, data, 201, "Book created");
  } catch (error) {
    next(error);
  }
}

export const updateBook: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await BookService.update(req.params.id, req.body);

    APIResponse.success(res, data, 200, "Book updated");
  } catch (error) {
    next(error);
  }
}

export const getBooks: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await BookService.getAll();

    APIResponse.success(res, data, 200, "Books fetched");
  } catch (error) {
    next(error);
  }
}

export const getBook: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await BookService.getSingle(req.params.id);

    APIResponse.success(res, data, 200, "Book fetched");
  } catch (error) {
    next(error);
  }
}

export const deleteBook: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await BookService.delete(req.params.id);

    APIResponse.success(res, data, 204, "Book deleted");
  } catch (error) {
    next(error);
  }
}