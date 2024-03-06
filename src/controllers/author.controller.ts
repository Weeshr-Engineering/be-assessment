import { Request, Response, NextFunction, RequestHandler } from "express";
import { APIResponse } from "../utils/response";
import { AuthorService } from "../services/author.service";

export const addAuthor: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await AuthorService.create(req.body);

    APIResponse.success(res, data, 201, "Author created");
  } catch (error) {
    next(error);
  }
}

export const updateAuthor: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await AuthorService.update(req.params.id, req.body);

    APIResponse.success(res, data, 200, "Author updated");
  } catch (error) {
    next(error);
  }
}

export const getAuthors: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await AuthorService.getAll();

    APIResponse.success(res, data, 200, "Authors fetched");
  } catch (error) {
    next(error);
  }
}

export const getAuthor: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await AuthorService.getSingle(req.params.id);

    APIResponse.success(res, data, 200, "Author fetched");
  } catch (error) {
    next(error);
  }
}

export const deleteAuthor: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await AuthorService.delete(req.params.id);

    APIResponse.success(res, data, 204, "Author deleted");
  } catch (error) {
    next(error);
  }
}