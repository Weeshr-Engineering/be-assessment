import { NotFoundError } from "../middlewares/error";
import { Book, bookInterface } from "../models/book.model";

export class BookService {
  static async create(data: bookInterface) {
    return await Book.create(data);
  }

  static async getAll() {
    return await Book.find();
  }

  static async getSingle(id: string) {
    if (!(await Book.findOne({ id }))) throw new NotFoundError("Book Not Found");

    return await Book.findOne({ id });
  }

  static async update(id: string, data: bookInterface) {
    if (!(await Book.findOne({ id }))) throw new NotFoundError("Book Not Found");

    return await Book.findOneAndUpdate({ id }, data);
  }

  static async delete(id: string) {
    if (!(await Book.findOne({ id }))) throw new NotFoundError("Book Not Found");

    return await Book.findOneAndDelete({ id });
  }
}
