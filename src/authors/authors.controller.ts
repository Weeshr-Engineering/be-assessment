import { Request, Response } from "express";
import { AuthorModel } from "./authors.model";

// get all author handler function
export const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const books = await AuthorModel.find({});
    if (books) {
      res.json({
        message: "Books fetched successfully",
        status: 200,
        data: books,
      });
    }
  } catch (err: any) {
    console.log(err);
    res.json({
      message: "Internal server error",
      status: 500,
      error: err.message,
      data: [],
    });
  }
};

// get one author handler function
export const getOneAuthor = (req: Request, res: Response) => {
  res.json({
    message: "This is the get one book route",
    data: req.params.id,
  });
};

// create author route
export const createAuthor = async (req: Request, res: Response) => {
  try {
    const book: {} = req.body;
    const newBook = await AuthorModel.create(book);
    if (newBook) {
      res.json({
        message: "Book created successfully in Db",
        status: 201,
        data: newBook,
      });
    }
  } catch (err: any) {
    res.json({
      message: "Internal server error",
      error: err.message,
      status: 500,
      data: [],
    });
  }
};

// update authors handler function
export const updateAuthor = (req: Request, res: Response) => {
  res.json({
    message: "This is the update books route",
    data: req.body,
  });
};

// delete author handler function
export const deleteAuthor = (req: Request, res: Response) => {
  res.json({
    message: "This is the delete books route",
    data: req.params.id,
  });
};
