import { object, string, number } from 'zod';

// Define the schema for the book attributes
const bookData = object({
  Title: string(),
  datePublished: string(), // Consider using `Date` type instead
  Description: string(),
  pageCount: number(),
  Genre: string(),
  Publisher: string(),
  authorId: string(), // Consider using proper author reference or ID type
});

export type BookAttributes = {
  Title: string;
  datePublished: string; // Consider using `Date` type instead
  Description: string;
  pageCount: number;
  Genre: string;
  Publisher: string;
  authorId: string; // Consider using proper author reference or ID type
};

export { bookData };