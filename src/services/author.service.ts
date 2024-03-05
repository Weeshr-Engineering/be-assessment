import { NotFoundError } from "../middlewares/error";
import { Author, authorInterface } from "../models/author.model";

export class AuthorService {
  static async create(data: authorInterface) {
    return await Author.create(data);
  }

  static async getAll() {
    return await Author.find();
  }

  static async getSingle(id: string) {
    if (!(await Author.findOne({ id }))) throw new NotFoundError("Author Not Found");

    return await Author.findOne({ id });
  }

  static async update(id: string, data: authorInterface) {
    if (!(await Author.findOne({ id }))) throw new NotFoundError("Author Not Found");

    return await Author.findOneAndUpdate({ id }, data);
  }

  static async delete(id: string) {
    if (!(await Author.findOne({ id }))) throw new NotFoundError("Author Not Found");

    return await Author.findOneAndDelete({ id });
  }
}
