import express, { Request, Response } from "express";
import { categorySchema, categorySchemaUpdate } from "../../api_schema";
import { ZodError } from "zod";
import { db } from "../../database";
import { book, category } from "../../database/schema";
import { eq } from "drizzle-orm";
import { paginate } from "../utils/pagination";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const { limit, page } = req.query;
    const result = await db.query.category.findMany({});

    const { paginatedResult, currPage, pageCount } = paginate(
      limit as string,
      page as string,
      result
    );
    res.status(200).json({
      success: true,
      page: currPage,
      pageCount,
      data: paginatedResult,
    });
  } catch (error) {
    console.log("Server Error", error);
    res.status(500).json({ success: true, error_msg: error });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = categorySchema.parse(req.body);

    const result = await db
      .insert(category)
      .values({
        name,
      })
      .returning();

    res.status(200).json({ success: true, data: result[0] });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(422).json({ success: false, error_message: error.message });
    }
    res.status(500).json({ success: false, error_msg: error });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    const { category_id } = req.params;
    const { limit, page } = req.query;

    const result = await db.query.category.findFirst({
      where: eq(category.id, category_id),
    });

    if (!result) {
      res.status(404).json({
        success: false,
        error_msg: "Can't Find that category...Please confirm again",
      });
      return;
    }

    const categoryBooks = await db.query.book.findMany({
      where: eq(book.category, result.name),
    });

    const { paginatedResult, currPage, pageCount } = paginate(
      limit as string,
      page as string,
      categoryBooks
    );

    const data = {
      ...result,
      booksInCategory: { page: currPage, pageCount, books: paginatedResult },
    };

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log("Server Error", error);
    res.status(500).json({ success: true, error_msg: error });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { category_id } = req.params;
    const { name } = categorySchemaUpdate.parse(req.body);

    const result = await db
      .update(category)
      .set({
        name,
      })
      .returning();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log("Server Error", error);
    res.status(500).json({ success: true, error_msg: error });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { category_id } = req.params;

    const result = await db
      .delete(category)
      .where(eq(category.id, category_id))
      .returning();

    res.status(204).json({ success: true, data: result });
  } catch (error) {
    console.log("Server Error", error);
    res.status(500).json({ success: true, error_msg: error });
  }
};
