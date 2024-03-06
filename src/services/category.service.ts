import { NotFoundError } from "../middlewares/error";
import { Category, categoryInterface } from "../models/category.model";

export class CategoryService {
  static async create(data: categoryInterface) {
    return await Category.create(data);
  }

  static async getAll() {
    return await Category.find();
  }

  static async getSingle(id: string) {
    if (!(await Category.findOne({ id }))) throw new NotFoundError("Category Not Found");

    return await Category.findOne({ id });
  }

  static async update(id: string, data: categoryInterface) {
    if (!(await Category.findOne({ id }))) throw new NotFoundError("Category Not Found");

    return await Category.findOneAndUpdate({ id }, data);
  }

  static async delete(id: string) {
    if (!(await Category.findOne({ id }))) throw new NotFoundError("Category Not Found");

    return await Category.findOneAndDelete({ id });
  }
}
