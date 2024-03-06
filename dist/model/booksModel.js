"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
// interface IBook {
//   title: string;
//   author: string;
//   publicationYear: number;
//   ISBN: string;
// }
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
        unique: true,
    },
    author: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    publicationYear: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: new Date().getFullYear(),
        allowNull: false,
    },
    ISBN: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize: database_config_1.default,
    modelName: "Book",
    timestamps: true,
    underscored: true,
});
exports.default = Book;
