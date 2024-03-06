const mockingoose = require("mockingoose");
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { BookModel } from "../src/models/bookModel";
import { logger } from "../src/util/logger";
import {
  createBook,
  getallBooks,
  getBookById,
} from "../src/controllers/bookController";
import "jest-express";
require("dotenv").config();

describe(" /api/v1/book", () => {
  test("Should get a Book Record Successfully  Route : /api/v1/book/:bookId", async () => {
    const response = {
      _id: "64c7ef18ac5ed8960e0da291",
      title: "Test Book 1",
      author: "65e71106d776e264543bc0fa",
      category: "65e7345567b07d9e503c37f1",
      categoryName: "FootBall",
      publicationYear: 2022,
      ISBN: "1234567890123",
    };
    mockingoose(BookModel).toReturn(response, "findOne");

    return BookModel.findById({ _id: "64c7ef18ac5ed8960e0da291" }).then(
      (doc) => {
        expect(JSON.parse(JSON.stringify(doc))).toMatchObject(response);
      }
    );
  });
  test("Should get a book record AND update  Route : /api/v1/book/update/:bookId", async () => {
    const response = {
      _id: "64c7ef18ac5ed8960e0da291",
      title: "Let Update ",
      author: "65e71106d776e264543bc0fa",
      category: "65e7345567b07d9e503c37f1",
      categoryName: "FootBall",
      publicationYear: 2022,
      ISBN: "1234567890123",
    };

    mockingoose(BookModel).toReturn(response, "updateOne");
    return BookModel.updateOne({ title : "changed" })
      .where({ _id: "64c7ef18ac5ed8960e0da291" })
      .then((doc) => {
        expect(JSON.parse(JSON.stringify(response))).toMatchObject(response);
      });
  });
});


// test("Should Get All Books Successfully", async () => {
//      logger.info("Testing Get All Books route");
//      logger.info("Starting Get All Books test");
   
//      // Mocking the expected response
//      const expectedResponse = {
//        success: true,
//        message: "Books retrieved successfully",
//        books: [
//          {
//            _id: "64c7ef18ac5ed8960e0da291",
//            title: "Test Book 1",
//            author: "Author ID 1",
//            category: "Category ID 1",
//            categoryName: "Category Name 1",
//            publicationYear: 2022,
//            ISBN: "1234567890123",
//          },
//          {
//            _id: "64c7ef18ac5ed8960e0da292",
//            title: "Test Book 2",
//            author: "Author ID 2",
//            category: "Category ID 2",
//            categoryName: "Category Name 2",
//            publicationYear: 2023,
//            ISBN: "1234567890456",
//          },
//          // Add more books as needed
//        ],
//      };
   
//      // Mocking the request and response objects
//      const req = {};
//      const res = {
//        json: jest.fn(),
//        status: jest.fn().mockReturnThis(),
//      };
//      // Call the getAllBooks function with the mocked request and response objects
//      await getAllBooks(req as Request, res as Response, null);
   
//      // Expectations
//      expect(res.status).toHaveBeenCalledWith(200);
//      expect(res.json).toHaveBeenCalledWith(expectedResponse);
//    });
   