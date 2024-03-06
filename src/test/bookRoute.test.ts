import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();

import Book from "../models/bookModel";
import Author from "../models/authorModel";
import bookRoutes from "../routes/book";
import authorRoutes from "../routes/author";

const app = express();
app.use(express.json());
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);

// Sample book data for testing
const sampleBookData = {
  title: "Test Book",
  author: "65e7e207d35e4a33c76e2b1b",
  category: "65e7e26bd35e4a33c76e2b1d",
  publicationYear: 2022,
  ISBN: "hwow2o2",
};

const sampleAuthorData = {
  name: "Test Author",
  biography: "Test Biography",
};

beforeAll(async () => {
  // Connect to a test database before running the tests
  await mongoose.connect(
    "mongodb+srv://Heepjay:Hipjay69@cluster0.0ykgrrp.mongodb.net/bookstore"
  );
});

afterAll(async () => {
  // Close the database connection after running all tests
  await mongoose.connection.close();
});

describe("POST /api/books", () => {
  it("should create a new book", async () => {
    // Make a POST request to the endpoint with sample book data

    const response = await request(app).post("/api/books").send(sampleBookData);
    // Expect status code 201 and the created book object
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(sampleBookData);

    // Clean up: delete the created book from the database
    await Book.deleteOne({ title: sampleBookData.title });
  });
});

describe("GET /api/authors", () => {
  it("should return a list of authors", async () => {
    // Insert a sample author to the database
    await Author.create(sampleAuthorData);

    // Make a GET request to the endpoint
    const response = await request(app).get("/api/authors");

    // Expect status code 200 and an array of authors
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);

    // Clean up: delete the sample author from the database
    await Author.deleteOne({ name: sampleAuthorData.name });
  });
});
