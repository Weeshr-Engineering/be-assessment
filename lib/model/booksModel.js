"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
const authorModel_1 = __importDefault(require("./authorModel"));
class Book extends sequelize_1.Model {
}
Book.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    publicationYear: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: new Date().getFullYear(),
        allowNull: false,
    },
    ISBN: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isISBNFormat(value) {
                const isbnRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
                if (!isbnRegex.test(value)) {
                    throw new Error("Invalid ISBN format");
                }
            },
        },
    },
    authorId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: authorModel_1.default,
            key: "id",
        },
    },
    // categoryId: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    //   references: {
    //     model: Category,
    //     key: "id",
    //   },
    // },
}, {
    sequelize: database_config_1.default,
    modelName: "Book",
    timestamps: true,
    underscored: true,
});
Book.belongsTo(authorModel_1.default, { foreignKey: "authorId" });
//Book.belongsTo(Category, { foreignKey: "categoryId" });
exports.default = Book;
