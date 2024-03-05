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
    authorName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    }
}, {
    sequelize: database_config_1.default,
    modelName: 'user'
});
