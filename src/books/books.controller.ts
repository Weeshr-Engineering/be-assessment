import { Request, Response } from "express";
import { BookModel } from "./books.model";
import { ObjectId } from "mongodb";

// get all books handler function
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await BookModel.find({});
    if (books) {
      res.status(200).send({
        message: "Books fetched successfully",
        data: books,
      });
    }
  } catch (err: any) {
    res.status(500).send({
      message: "Internal server error",
      error: err.message,
      data: [],
    });
  }
};

// get one book handler function
export const getOneBook = async (req: Request, res: Response) => {
  try {
    const bookID = req.params.id;
    const bookRequested = await BookModel.findById({
      _id: new ObjectId(bookID),
    });
    if (bookRequested) {
      res.status(200).send({
        message: "Book successfully retrieved.",
        data: bookRequested,
      });
    }
  } catch (error: any) {
    res.status(404).send({
      message: "Error retrieving book",
      err: error.message,
      data: [],
    });
  }
};

// create a book handler function
export const createBook = async (req: Request, res: Response) => {
  try {
    const book: {} = req.body;
    const newBook = await BookModel.create(book);
    if (newBook) {
      res.status(201).send({
        message: "Book created successfully in Db",
        data: newBook,
      });
    }
  } catch (err: any) {
    res.status(500).send({
      message: "Internal server error",
      error: err.message,
      data: [],
    });
  }
};

// update books handler function
export const updateBook = async (req: Request, res: Response) => {
  try {
    const bookID = req.params.id; // grabbing the id of the book to update
    const bookToUpdate = req.body; // grabbing the body of the book to update
    const query = { _id: new ObjectId(bookID) };

    const updatedBook = await BookModel.updateOne(query, {
      $set: bookToUpdate,
    });

    if (updatedBook) {
      // response if update is successful
      res.status(200).send({
        message: "Book updated successfully in Db",
        data: updatedBook,
      });
    }
  } catch (err: any) {
    res.status(304).send({
      message: "Unable to update book",
      error: err.message,
      data: [],
    });
  }
};

// delete books handler function
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookID = req.params.id;
    const query = { _id: new ObjectId(bookID) };
    const deletedBook = await BookModel.deleteOne(query);

    if (deletedBook) {
      res.status(200).send({
        message: `Successfully removed book with id ${bookID}`,
      });
    }
  } catch (err: any) {
    res.status(400).send({
      message: err.message,
    });
  }
};
