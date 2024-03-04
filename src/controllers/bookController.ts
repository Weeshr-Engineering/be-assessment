import { Response, Request } from "express";
import { BookModel, Book } from "../models/bookModel";
import { STATUS_CODES } from "../util/statusCode";
import { logger } from "../util/logger";

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
        
};

/**
 * Get all books
 * @route GET /all
 * @desc Get a list of all books
 * @access Public
 * @param req The request object
 * @param res The response object
 * @returns Response
 */
export const getallBooks = async (req: Request , res: Response , next: any) => {

}

/**
 * Get details of a specific book by ID
 * @route GET /:bookId
 * @desc Get details of a specific book
 * @access Public
 * @param req The request object containing the bookId parameter
 * @param res The response object
 * @returns Response
 */
export const getBookById = async (req: Request , res: Response , next: any) => {
    
}
/**
 * Update details of a specific book by ID
 * @route PUT /update/:bookId
 * @desc Update the details of a book
 * @access Public
 * @param req The request object containing the bookId parameter and updated data
 * @param res The response object
 * @returns Response
 */
export const updateBookById = async (req: Request , res: Response , next: any) => {
    
}
/**
 * Delete a specific book by ID
 * @route DELETE /delete/:bookId
 * @desc Delete a book
 * @access Public
 * @param req The request object containing the bookId parameter
 * @param res The response object
 * @returns Response
 */
export const deleteBookById = async (req: Request , res: Response , next: any) => {
    
}