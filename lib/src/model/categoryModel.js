"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
class Category extends sequelize_1.Model {
}
Category.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    genre: {
        type: sequelize_1.DataTypes.ENUM('fiction', 'non-fiction', 'romance', 'thriller', 'fantasy'),
        allowNull: false,
        validate: {
            isIn: [['fiction', 'non-fiction', 'romance', 'thriller', 'fantasy']],
        },
    },
}, {
    sequelize: database_config_1.default,
    modelName: "Category",
    timestamps: true,
    underscored: true,
});
exports.default = Category;
