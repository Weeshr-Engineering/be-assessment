import { Response, Request } from "express";
import { BookModel, Book } from "../models/bookModel";
import { AuthorModel } from "../models/authorModel";
import { CategoryModel } from "../models/categoriesModel";
import { STATUS_CODES } from "../util/statusCode";
import { logger } from "../util/logger";
import {
  validateCreateBook,
  validateUpdateBookData,
} from "../validation/bookvalid";

/**
 * Create a new book
 * @route POST /create
 * @desc Create a new book
 * @access Public
 * @param req The request object
 * @param res The response object
 * @returns Response
 */
export const createBook = async (req: Request, res: Response, next: any) => {
  if (!req.body.user || !req.body.user.id) {
    return res.status(STATUS_CODES.INVALID).json({
      success: false,
      message: "Unauthorized: User information missing in request body",
    });
  }
 
  const { id } = req.body.user;
  const { title, categoryId, publicationYear, ISBN } = req.body;
  logger.info("Validating Create Book Credentails");
  const { error } = validateCreateBook.validate(
    { title, categoryId, publicationYear, ISBN },
    { abortEarly: false }
  );
  if (error) {
    return res.status(STATUS_CODES.INVALID).json({
      success: false,
      message: error.details[0].message.replace(/"|'/g, ""),
      status: "Invalid",
    });
  }
  try {
    const author = await AuthorModel.findOne({ _id: id });
    if (!author) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Author not found",
        status: "Not Found",
      });
    }
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Category not found",
        status: "Not Found",
      });
    }

    const newBook = new BookModel({
      title,
      author: req.body.user.id,
      category,
      categoryName: category.name, // Get the category name
      publicationYear,
      ISBN,
    });
    await newBook.save();
    logger.info("Created a Book a record Succesfully");
    return res.status(STATUS_CODES.CREATED).json({
      success: true,
      message: "Book created successfully",
      book: newBook,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

/**
 * Get all books
 * @route GET /all
 * @desc Get a list of all books
 * @access Public
 * @param req The request object
 * @param res The response object
 * @returns Response
 */ export const getallBooks = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const books = await BookModel.find();
    logger.info("Getting all Books Record");
    return res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      message: "Books retrieved successfully",
      books,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

/**
 * Get details of a specific book by ID
 * @route GET /:bookId
 * @desc Get details of a specific book
 * @access Public
 * @param req The request object containing the bookId parameter
 * @param res The response object
 * @returns Response
 */ export const getBookById = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const bookId = req.params.bookId;
    if (!bookId) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "BookId is not found",
      });
    }
    const book = await BookModel.findById(bookId);
    if (!book) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Book not found",
      });
    }
    logger.info("Fetching a Book By Id");
    return res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      message: "Book retrieved successfully",
      book,
    });
  } catch (error) {
    logger.error("Error fetching book:");
    next(error);
  }
};

/**
 * Update details of a specific book by ID
 * @route PUT /update/:bookId
 * @desc Update the details of a book
 * @access Public
 * @param req The request object containing the bookId parameter and updated data
 * @param res The response object
 * @returns Response
 */
export const updateBookById = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const bookId = req.params.bookId;
    const updateFields = req.body;
    logger.info("Getting a Book Id");
    if (!updateFields) {
      return res.status(STATUS_CODES.INVALID).json({
        success: false,
        message: "Update the fields ",
      });
    }
    const updatedBook = await BookModel.findByIdAndUpdate(
      bookId,
      updateFields,
      { new: true }
    );
    logger.warn("Updating Book A Record");
    if (!updatedBook) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Book not found",
      });
    }
    return res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

/**
 * Delete a specific book by ID
 * @route DELETE /delete/:bookId
 * @desc Delete a book
 * @access Public
 * @param req The request object containing the bookId parameter
 * @param res The response object
 * @returns Response
 */
export const deleteBookById = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const bookId = req.params.bookId;
    const authorId = req.body.user.id;
    if (!bookId) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "BookId is not found",
      });
    }

    const book = await BookModel.findById(bookId);

    if (!book) {
      logger.error("Book not found");
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Book not found",
      });
    }

    if (String(book.author) !== authorId) {
      logger.error("Unauthorized user tried to delete the book");
      return res.status(STATUS_CODES.INVALID).json({
        success: false,
        message: "You are not authorized to delete this book",
      });
    }
    const deletedBook = await BookModel.findByIdAndDelete(bookId);
    logger.warn("Delete a Book Record..");
    return res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
