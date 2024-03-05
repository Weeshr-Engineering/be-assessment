"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../database.config"));
class user extends sequelize_1.Model {
}
exports.user = user;
user.init({
    Title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    Description: {
        type: sequelize_1.DataTypes.STRING,
        // allowNull: false
    },
    pageCount: {
        type: sequelize_1.DataTypes.STRING,
        // allowNull: false
    },
    Genre: {
        type: sequelize_1.DataTypes.STRING,
        // allowNull: false
    },
    Publisher: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    bookId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    }
}, {
    sequelize: database_config_1.default,
    modelName: 'books'
});
