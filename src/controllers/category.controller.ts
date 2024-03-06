import { Request, Response, NextFunction, RequestHandler } from "express";
import { APIResponse } from "../utils/response";
import { CategoryService } from "../services/category.service";

export const addCategory: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await CategoryService.create(req.body);

    APIResponse.success(res, data, 201, "Book created");
  } catch (error) {
    next(error);
  }
}
export const getCategorys: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await CategoryService.getAll();

    APIResponse.success(res, data, 200, "Categories fetched");
  } catch (error) {
    next(error);
  }
}

export const getCategory: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await CategoryService.getSingle(req.params.id);

    APIResponse.success(res, data, 200, "Category fetched");
  } catch (error) {
    next(error);
  }
}
export const updateCategory: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await CategoryService.update(req.params.id, req.body);

    APIResponse.success(res, data, 200, "Category updated");
  } catch (error) {
    next(error);
  }
}

export const deleteCategory: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await CategoryService.delete(req.params.id);

    APIResponse.success(res, data, 204, "Category deleted");
  } catch (error) {
    next(error);
  }
}