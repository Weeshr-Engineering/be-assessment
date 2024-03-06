import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import { ZodError } from "zod";
import { authorSchema, authorSchemaUpdate } from "../../api_schema";
import { db } from "../../database";
import { author, book } from "../../database/schema";
import { paginate } from "../utils/pagination";

export const createAuthor = async (req: Request, res: Response) => {
  try {
    const { name, email } = authorSchema.parse(req.body);

    const result = await db
      .insert(author)
      .values({
        email,
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

export const getAuthors = async (req: Request, res: Response) => {
  try {
    const { limit, page } = req.query;
    const result = await db.query.author.findMany();
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

export const getAuthor = async (req: Request, res: Response) => {
  try {
    const { author_id } = req.params;
    const { limit, page } = req.query;

    const result = await db.query.author.findFirst({
      where: eq(author.id, author_id),
    });

    if (!result) {
      res.status(404).json({
        success: false,
        error_msg: "Author Does Not Exist...Maybe it's a typo",
      });
      return;
    }

    const authorBooks = await db.query.book.findMany({
      where: eq(book.author, result.name),
    });
    let { paginatedResult, currPage, pageCount } = paginate(
      limit as string,
      page as string,
      authorBooks
    );

    const data = {
      ...result,
      booksByAuthor: { page: currPage, pageCount, books: paginatedResult },
    };
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {}
};

export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const { author_id } = req.params;
    const { name, email } = authorSchemaUpdate.parse(req.body);

    const result = await db
      .update(author)
      .set({
        name,
        email,
        updated_at: new Date(),
      })
      .where(eq(author.id, author_id))
      .returning();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {}
};

export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const { author_id } = req.params;

    const result = await db
      .delete(author)
      .where(eq(author.id, author_id))
      .returning();

    res.status(204).json({ success: true, data: result });
  } catch (error) {
    console.log("Server Error", error);
    res.status(500).json({ success: true, error_msg: error });
  }
};
