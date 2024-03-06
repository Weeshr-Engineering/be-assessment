import express from "express";
import { authorSchema, authorSchemaUpdate } from "../../api_schema";
import { ZodError } from "zod";
import { db } from "../../database";
import { author, book, category } from "../../database/schema";
import { eq } from "drizzle-orm";

const router = express.Router();

router.route("/create").post(async (req, res) => {
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
});

router.route("/").get(async (req, res) => {
  try {
    const { limit, page } = req.query;
    const result = await db.query.author.findMany();
    const pageLimit = parseInt(limit as string) || 30;
    const pageCount = Math.ceil(result.length / pageLimit);
    let currPage = parseInt(page as string) || 1;

    if (currPage > pageCount) {
      currPage = pageCount;
    }

    const start = (currPage - 1) * pageLimit;
    const end = start + pageLimit;
    const paginatedResult = result.slice(start, end);
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
});

router.route("/:author_id").get(async (req, res) => {
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
    const pageLimit = parseInt(limit as string) || 30;
    const pageCount = Math.ceil(authorBooks.length / pageLimit);
    let currPage = parseInt(page as string) || 1;

    if (currPage > pageCount) {
      currPage = pageCount;
    }

    const start = (currPage - 1) * pageLimit;
    const end = start + pageLimit;
    const paginatedBooks = authorBooks.slice(start, end);

    const data = {
      ...result,
      booksByAuthor: { page: currPage, pageCount, books: paginatedBooks },
    };
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {}
});

router.route("/:author_id/update").put(async (req, res) => {
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
});

router.route("/:author_id/delete").delete(async (req, res) => {
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
});

export default router;
