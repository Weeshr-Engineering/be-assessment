import Author from "../model/authorModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { ZodError } from "zod";
import jwt from "jsonwebtoken";
import { authorSchema } from "../validation/validation";

interface AuthRequest extends Request {
  author?: any;
}

function generateAccessToken(author: Author) {
  const payload = {
    email: author.email,
    id: author.id,
  };
  const secret = "weeshr";
  const options = { expiresIn: "1h" };

  return jwt.sign(payload, secret, options);
}

// Create a new author
export const addNewAuthor = async (req: AuthRequest, res: Response) => {
  try {
    const validateAuthor = authorSchema.parse(req.body);

    const { fullName, email, password, confirmPassword } = validateAuthor;

    const existingAuthor = await Author.findOne({ where: { email } });

    if (existingAuthor) {
      return res.status(400).json({
        message: "Author already exists. Try again!",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "Kindly provide all required fields",
      });
    }

    const createNewAuthor = await Author.create({
      fullName,
      email,
      password: hashedpassword,
      confirmPassword: hashedpassword,
    });

    const accessToken = generateAccessToken(createNewAuthor);

    res.status(201).json({
      message: "Welcome! Author.",
      createNewAuthor,
      accessToken,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Invalid request data",
        error: error.message,
      });
    } else {
      return res.status(500).json({
        message: "Server error",
        error,
      });
    }
  }
};

// Get all authors
export const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await Author.findAll();
    console.log(authors);

    const authorDetails = authors.map((author) => ({
      id: author.id,
      fullName: author.fullName,
      email: author.email,
    }));

    res.status(200).json({
      message: "All authors gotten successfully!",
      authors: authorDetails,
    });
  } catch (error) {
    if (error instanceof ZodError) {
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

// Get a specific author
export const getSpecificAuthor = async (req: Request, res: Response) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (!author) {
      return res.status(404).json({
        message: "Author not found",
      });
    }
    res.status(200).json({
      message: "welcome back!",
      author,
    });
  } catch (error) {
    if (error instanceof ZodError) {
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

// Update an author details
export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const authorUpdate = await Author.findByPk(req.params.id);

    if (!authorUpdate) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    await Author.update(req.body, { where: { id: req.params.id } });
    res.status(200).json({
      message: "Author details updated successfully!",
    });
  } catch (error) {
    if (error instanceof ZodError) {
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

// Delete an author
export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const authorDelete = await Author.findByPk(req.params.id);

    if (!authorDelete) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    await Author.destroy({ where: { id: req.params.id } });

    res.status(200).json({
      message: "Author deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};
