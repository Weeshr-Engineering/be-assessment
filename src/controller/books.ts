import { NextFunction, Request, Response } from "express";
import Book from "../model/booksModel";
import { Op } from "sequelize";


// Create a new book
export const addNewBook = async (req: Request, res: Response) => {
  try {
    const { title, author, category, publicationYear, ISBN } = req.body;

    if (!title || !author || !category || !publicationYear || !ISBN) {
      return res.status(400).json({
        message: "Kindly provide all required fields",
      });
    }

    const createNewBook = await Book.create({
      title,
      author,
      category,
      publicationYear,
      ISBN,
    });

    res.status(201).json({
      message: "Well-done! Book added successfully",
      createNewBook,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      //error: error.message,
    });
  }
};

// Get a list of all books
// export const getAllBooks = async (req: Request, res: Response) => {
//   const page = parseInt(req.query.page as string) || 1;

//   const limit = parseInt(req.query.limit as string) || 10;

//   const offset = (page - 1) * limit;

//   try {
//     const getBooks = await Books.findAll({ offset, limit });

//     const totalBookCount = await Books.count();

//     const pages = Math.ceil(totalBookCount / limit);

//     return res.status(200).json({ getBooks, pages, currentPage: page });
//   } catch (error) {
//     if (error instanceof Error) {
//       return res.status(500).json({
//         message: "Server error",
//         error: error.message,
//       });
//     }
//     res.status(500).json({
//       message: "Server error",
//       error,
//     });
//   }
// };

export const getAllBooks = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

  const sortBy = req.query.sortBy as string;
  const sortOrder = req.query.sortOrder === 'desc' ? 'DESC' : 'ASC';

  const filterAuthor = req.query.author as string;
  const filterCategory = req.query.category as string;

  try {
    const filter: any = {};
    if (filterAuthor) {
      filter.author = filterAuthor;
    }
    if (filterCategory) {
      filter.category = filterCategory;
    }

    const order: any = sortBy ? [[sortBy, sortOrder]] : [];

    const { count, rows: getBooks } = await Book.findAndCountAll({
      where: filter,
      order,
      limit,
      offset,
    });

    const pages = Math.ceil(count / limit);

    return res.status(200).json({ getBooks, pages, currentPage: page });
  } catch (error: any) {
    console.error("Error retrieving books:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// Get details of a specific book
export const getOneBook = async (req: Request, res: Response) => {
  try {
    const getBook = await Book.findByPk(req.params.id);

    if (!getBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }
    return res.status(200).json(getBook);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

// update details of a book
export const updateBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const updatedBook = req.body;

    const updatedBookDoc = await Book.update(updatedBook, {
      where: { bookId },
    });

    if (!updatedBookDoc) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({
      message: "Book updated successfully",
      updatedBook: updatedBookDoc,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

// Delete a book
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;

    const deletedBook = await Book.destroy({ where: { id: bookId } });

    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json("Book deleted successfully");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
