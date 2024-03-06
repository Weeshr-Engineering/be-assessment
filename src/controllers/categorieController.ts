import { Response, Request } from "express";
import { CategoryModel, Category } from "../models/categoriesModel";
import { STATUS_CODES } from "../util/statusCode";
import { logger } from "../util/logger";
import {
  validateCreateCategory,
  validateUpdateCategory,
} from "../validation/category";
/**
 * Create a new category
 * @route POST /categories/create
 * @desc Create a new category
 * @access Public
 * @param req The request object
 * @param res The response object
 * @returns Response
 */
export const createCategory = async (
  req: Request,
  res: Response,
  next: any
) => {
  const { name, description } = req.body;
  const { error } = validateCreateCategory.validate(req.body);
  logger.info("Validating Category Credntials");
  if (error) {
    return res.status(STATUS_CODES.INVALID).json({
      success: false,
      message: error.details[0].message.replace(/"|'/g, ""),
      status: "Invalid",
    });
  }
  try {
    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(STATUS_CODES.EXISTS).json({
        success: false,
        message: "Category not found",
        status: "Not Found",
      });
    }
    const category = new CategoryModel({
      name,
      description,
    });
    logger.info("Created Category Succesfully");
    await category.save();
    return res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    logger.error(error);
    return res.status(STATUS_CODES.SERVER_ERROR).json({
      success: false,
      message: "Failed to create category",
    });
  }
};

/**
 * Get all categories
 * @route GET /categories/all
 * @desc Get a list of all categories
 * @access Public
 * @param req The request object
 * @param res The response object
 * @returns Response
 */
export const getAllCategories = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const categories = await CategoryModel.find({}).sort({
      date: -1,
    }); // sort
    logger.info("Fetching all Catergories");
    return res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      message: "Categories retrieved successfully",
      categories,
    });
  } catch (error) {
    logger.error(error);
    return res.status(STATUS_CODES.SERVER_ERROR).json({
      success: false,
      message: "Failed to retrieve categories",
    });
  }
};

/**
 * Get details of a specific category by ID
 * @route GET /categories/:categoryId
 * @desc Get details of a specific category
 * @access Public
 * @param req The request object containing the categoryId parameter
 * @param res The response object
 * @returns Response
 */
export const getCategoryById = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Category not found",
      });
    }
    logger.info("Fetcing A category by Id");
    return res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      message: "Category retrieved successfully",
      category,
    });
  } catch (error) {
    logger.error(error);
    return res.status(STATUS_CODES.SERVER_ERROR).json({
      success: false,
      message: "Failed to retrieve category",
    });
  }
};

/**
 * Update details of a specific category by ID
 * @route PUT /categories/update/:categoryId
 * @desc Update the details of a category
 * @access Public
 * @param req The request object containing the categoryId parameter and updated data
 * @param res The response object
 * @returns Response
 */
export const updateCategoryById = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const categoryId = req.params.categoryId;
    const { name, description } = req.body;
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      categoryId,
      { name, description },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Category not found",
      });
    }
    logger.info("Updating a category records");
    return res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    logger.error(error);
    return res.status(STATUS_CODES.SERVER_ERROR).json({
      success: false,
      message: "Failed to update category",
    });
  }
};

/**
 * Delete a specific category by ID
 * @route DELETE /categories/delete/:categoryId
 * @desc Delete a category
 * @access Public
 * @param req The request object containing the categoryId parameter
 * @param res The response object
 * @returns Response
 */
export const deleteCategoryById = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const categoryId = req.params.categoryId;
    const deletedCategory = await CategoryModel.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Category not found",
      });
    }
    logger.warn("Deleting a Category");
    return res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    logger.error(error);
    return res.status(STATUS_CODES.SERVER_ERROR).json({
      success: false,
      message: "Failed to delete category",
    });
  }
};
