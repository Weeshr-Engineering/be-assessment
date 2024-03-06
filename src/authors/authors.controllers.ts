import { Request, Response } from "express";
import { AuthorModel } from "./authors.model";
import { ObjectId } from "mongodb";

// get all author handler function
export const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await AuthorModel.find({});
    if (authors) {
      res.status(200).send({
        message: "Authors fetched successfully",
        data: authors,
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

// get one author handler function
export const getOneAuthor = async (req: Request, res: Response) => {
  try {
    const authorID = req.params.id;
    const authorRequested = await AuthorModel.findById({
      _id: new ObjectId(authorID),
    });
    if (authorRequested) {
      res.status(200).send({
        message: "Author successfully retrieved.",
        data: authorRequested,
      });
    }
  } catch (error: any) {
    res.status(404).send({
      message: "Error retrieving author",
      err: error.message,
      data: [],
    });
  }
};

// create a author handler function
export const createAuthor = async (req: Request, res: Response) => {
  try {
    const author: {} = req.body;
    const newAuthor = await AuthorModel.create(author);
    if (newAuthor) {
      res.status(201).send({
        message: "Author created successfully in Db",
        data: newAuthor,
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
export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const authorID = req.params.id; // grabbing the id of the author to update
    const authorToUpdate = req.body; // grabbing the author of the book to update
    const query = { _id: new ObjectId(authorID) };

    const updatedAuthro = await AuthorModel.updateOne(query, {
      $set: authorToUpdate,
    });

    if (updatedAuthro) {
      // response if update is successful
      res.status(200).send({
        message: "Author updated successfully in Db",
        data: updatedAuthro,
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

// delete author handler function
export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const authorID = req.params.id;
    const query = { _id: new ObjectId(authorID) };
    const deletedAuthor = await AuthorModel.deleteOne(query);

    if (deletedAuthor) {
      res.status(200).send({
        message: `Successfully removed book with id ${authorID}`,
      });
    }
  } catch (err: any) {
    res.status(400).send({
      message: err.message,
    });
  }
};
