import { Request, Response, NextFunction, RequestHandler } from "express";

import prisma from "../utils/prisma";

import { ResponseHandler } from "../utils/responseHandler";

import {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  InternalServerError,
} from "../middlewares/errorhandler";

export const createCategory: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, tags } = req.body;

    const tagsString = tags.join(",");

    const Category = await prisma.category.create({
      data: {
        name,
        tags: tagsString,
      },
      select: {
        id: true,
        name: true,
        tags: true,
      },
    });

    if (!Category) {
      throw new InternalServerError("Category not created");
    }

    ResponseHandler.success(
      res,
      Category,
      201,
      "Category created successfully"
    );
  } catch (error) {
    next(error);
  }
};

export const getCategories: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        Book: true,
      },
    });

    if (!categories) {
      throw new NotFoundError("No categories found");
    }

    ResponseHandler.success(res, categories, 200, "Categories retrieved");
  } catch (error) {
    next(error);
  }
};

export const getCategory: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;

    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(categoryId),
      },
      include: {
        Book: true,
      },
    });

    if (!category) {
      throw new NotFoundError("Category not found");
    }

    ResponseHandler.success(res, category, 200, "Category retrieved");
  } catch (error) {
    next(error);
  }
};

export const updateCategory: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;
    const { name, tags } = req.body;

    const category = await prisma.category.update({
      where: {
        id: parseInt(categoryId),
      },
      data: {
        name,
        tags,
      },
      select: {
        id: true,
        name: true,
        tags: true,
      },
    });

    if (!category) {
      throw new InternalServerError("Category not updated");
    }

    ResponseHandler.success(res, category, 200, "Category updated");
  } catch (error) {
    next(error);
  }
};

export const deleteCategory: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;

    const category = await prisma.category.delete({
      where: {
        id: parseInt(categoryId),
      },
      include: {
        Book: true,
      },
    });

    if (!category) {
      throw new InternalServerError("Category not deleted");
    }

    ResponseHandler.success(res, category, 200, "Category deleted");
  } catch (error) {
    next(error);
  }
};
