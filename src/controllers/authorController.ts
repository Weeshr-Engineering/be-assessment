import { Response, Request } from "express";
import bcrypt from "bcrypt";
import { AuthorModel, Author } from "../models/authorModel";
import { STATUS_CODES } from "../util/statusCode";
import { generateAccessToken, generateRefreshToken } from "../util/tokens";
import { logger } from "../util/logger";
import {
  validateCreateAuthor,
  validateLoginAuthor,
  validateGetAuthor,
  validateUpdateAuthor,
} from "../validation/authorvalid";

/**
 * Create a new author
 * @route POST /create
 * @desc Create a new author
 * @access Public
 * @param req The request object
 * @param res The response object
 * @returns Response
 */
export const createAuthor = async (req: Request, res: Response, next: any) => {
  const { name, email, password, confirmPassword, bio }: Author = req.body;
  if (password !== confirmPassword) {
    return res.status(STATUS_CODES.INVALID).json({
      success: false,
      message: "Passwords does not Match",
      status: "Invalid",
    });
  }
  const { error } = validateCreateAuthor.validate(req.body);
  if (error) {
    return res.status(STATUS_CODES.INVALID).json({
      success: false,
      message: error.details[0].message.replace(/"|'/g, ""),
      status: "Invalid",
    });
  }
  const existingAuthor = await AuthorModel.findOne({ email });
  if (existingAuthor) {
    return res.status(STATUS_CODES.INVALID).json({
      success: false,
      message: "User Already exists",
      status: "Invalid",
    });
  }

  try {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new author instance
    const newAuthor = new AuthorModel({
      name,
      email,
      password: hashedPassword,
      bio,
    });

    await newAuthor.save();

    return res.status(STATUS_CODES.CREATED).json({
      success: true,
      message: "Author created successfully",
      status: "Created",
      author: newAuthor,
    });
  } catch (error) {
    console.error("Error creating author:", error);
    next(error); // Pass error to Express error handling middleware
  }
};

/**
 * Login author
 * @route POST /login
 * @desc Login an author after signUp
 * @access Public
 * @param req The request object
 * @param res The response object
 * @returns Response
 */
export const loginAuthor = async (req: Request, res: Response, next: any) => {
  const { email, password } = req.body;
  const { error } = validateLoginAuthor.validate(req.body);
  if (error) {
    return res.status(STATUS_CODES.INVALID).json({
      success: false,
      message: error.details[0].message.replace(/"|'/g, ""),
      status: "Invalid",
    });
  }
  try {
    const user = await AuthorModel.findOne({ email });
    if (!user) {
      return res.status(STATUS_CODES.INVALID).json({
        success: false,
        message: "Invalid email or password",
        status: "Invalid",
      });
    }

    // Verify password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(STATUS_CODES.INVALID).json({
        success: false,
        message: "Invalid email or password",
        status: "Invalid",
      });
    }
    const accessToken = generateAccessToken(user._id); // access token
    const refreshToken = generateRefreshToken(user._id); // refresh token

    // Save refresh token with the user
    user.refreshToken = refreshToken;
    await user.save();

    return res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      message: "Login successful",
      status: "Success",
      accessToken,
    });
  } catch (error) {
    next(error); // Pass error to Express error handling middleware
  }
};

/**
 * Get all authors
 * @route GET /all
 * @desc Get a list of all authors
 * @access Public
 * @param req The request object
 * @param res The response object
 * @returns Response
 */
export const getAllAuthors = async (req: Request, res: Response, next: any) => {
  try {
    const authors = await AuthorModel.find();

    if (!authors || authors.length === 0) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "No authors found",
        status: "Not Found",
      });
    }
    return res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      message: "Authors retrieved successfully",
      status: "Success",
      authors,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get details of a specific author by ID
 * @route GET /:authorId
 * @desc Get details of a specific author
 * @access Public
 * @param req The request object containing the authorId parameter
 * @param res The response object
 * @returns Response
 */
export const getAuthorById = async (req: Request, res: Response, next: any) => {
  try {
    const authorId = req.params.authorId;
    const author = await AuthorModel.findById(authorId);

    if (!author) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Author not found",
        status: "Not Found",
      });
    }
    return res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      message: "Author details retrieved successfully",
      status: "Success",
      author,
    });
  } catch (error) {
    console.error("Error retrieving author by ID:", error);
    return res.status(STATUS_CODES.SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
      status: "Error",
    });
  }
};
/**
 * Update details of a specific author by ID
 * @route PUT /update/:authorId
 * @desc Update the details of an author
 * @access Public
 * @param req The request object containing the authorId parameter and updated data
 * @param res The response object
 * @returns Response
 */
export const updateAuthorById = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const authorId = req.params.authorId;
    const updatedData = req.body;
    const { error } = validateUpdateAuthor.validate(req.body);
    if (error) {
      return res.status(STATUS_CODES.INVALID).json({
        success: false,
        message: error.details[0].message.replace(/"|'/g, ""),
        status: "Invalid",
      });
    }

    const updatedAuthor = await AuthorModel.findByIdAndUpdate(
      authorId,
      updatedData,
      { new: true }
    );
    if (!updatedAuthor) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Author not found",
        status: "Not Found",
      });
    }
    return res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      message: "Author updated successfully",
      status: "Success",
      author: updatedAuthor,
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Delete a specific author by ID
 * @route DELETE /delete/:authorId
 * @desc Delete an author
 * @access Public
 * @param req The request object containing the authorId parameter
 * @param res The response object
 * @returns Response
 */
export const deleteAuthorById = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const authorId = req.params.authorId;
    if (!authorId) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "AuthorId is required",
      });
    }
    const deletedAuthor = await AuthorModel.findByIdAndDelete(authorId);

    if (!deletedAuthor) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Author not found",
        status: "Not Found",
      });
    }

    return res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      message: "Author deleted successfully",
      status: "Success",
    });
  } catch (error) {
    next(error);
  }
};
