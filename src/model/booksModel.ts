import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.config";
import Author from "./authorModel";
import Category from "./categoryModel";


class Book extends Model {
  id!: string;
  title!: string;
  author!: string;
  category!: string;
  publicationYear!: number;
  ISBN!: string;
  authorId!: string;
  categoryId!:string;
}

Book.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publicationYear: {
      type: DataTypes.INTEGER,
      defaultValue: new Date().getFullYear(),
      allowNull: false,
    },
    ISBN: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isISBNFormat(value: string) {
          const isbnRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
          if (!isbnRegex.test(value)) {
            throw new Error("Invalid ISBN format");
          }
        },
      },
    },
    authorId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Author,
        key: "id",
      },
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Category,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Book",
    timestamps: true,
    underscored: true,
  }
);

Book.belongsTo(Author, { foreignKey: "authorId" });
Book.belongsTo(Category, { foreignKey: "categoryId" });

export default Book;
