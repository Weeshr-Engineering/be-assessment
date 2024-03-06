import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import { ZodError } from "zod";
import { bookSchema, bookSchemaUpdate } from "../../api_schema";
import { db } from "../../database";
import { author, book, category } from "../../database/schema";
import { paginate } from "../utils/pagination";

export const getBooksHandler = async (req: Request, res: Response) => {
  try {
    const { limit, page, sort } = req.query;
    const result = await db.query.book.findMany();
    let { paginatedResult, currPage, pageCount } = paginate(
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

export const createBookHandler = async (req: Request, res: Response) => {
  try {
    const {
      title,
      ISBN,
      author: authorName,
      category: categoryName,
      publicationYear,
    } = bookSchema.parse(req.body);

    const isValidAuthor = await db.query.author.findFirst({
      where: eq(author.name, authorName),
    });

    const isValidCategory = await db.query.category.findFirst({
      where: eq(category.name, categoryName),
    });

    if (!isValidAuthor) {
      res
        .status(404)
        .json({ success: false, error_msg: "This author doesn't exist" });
      return;
    }

    if (!isValidCategory) {
      const newCategory = await db
        .insert(category)
        .values({
          name: categoryName,
        })
        .returning();

      const result = await db
        .insert(book)
        .values({
          title,
          author: authorName,
          category: newCategory[0].name,
          publicationYear,
          isbn: ISBN,
        })
        .returning();
      res.status(200).json({ success: true, data: result[0] });
      return;
    }

    const result = await db
      .insert(book)
      .values({
        title,
        author: authorName,
        category: categoryName,
        publicationYear,
        isbn: ISBN,
      })
      .returning();

    res.status(201).json({ success: true, data: result[0] });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(422).json({ success: false, error_message: error.message });
      return;
    }
    res.json({ success: false, error_msg: error });
  }
};

export const getBookHandler = async (req: Request, res: Response) => {
  try {
    const { book_id } = req.params;

    const result = await db.query.book.findFirst({
      where: eq(book.id, book_id),
    });

    if (!result) {
      res.status(404).json({
        success: false,
        error_msg: "We don't have that book",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, error_msg: error });
  }
};

export const editBookHandler = async (req: Request, res: Response) => {
  try {
    const { book_id } = req.params;
    const { title, ISBN, author, category, publicationYear } =
      bookSchemaUpdate.parse(req.body);

    const result = await db
      .update(book)
      .set({
        title,
        isbn: ISBN,
        author,
        category,
        publicationYear,
        updated_at: new Date(),
      })
      .where(eq(book.id, book_id))
      .returning();

    res.status(200).json({ success: true, data: result[0] });
  } catch (error) {
    res.status(500).json({ success: false, error_msg: error });
  }
};

export const deleteBookHandler = async (req: Request, res: Response) => {
  try {
    const { book_id } = req.params;

    const result = await db
      .delete(book)
      .where(eq(book.title, book_id))
      .returning();

    res.status(204).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error_msg: error });
  }
};
