"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// import { Schema, model } from "mongoose";
const usersSchema = new mongoose_1.default.Schema({
    authorName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const user = mongoose_1.default.model("user", usersSchema);
exports.default = user;
// import { Sequelize, DataTypes, Model } from "sequelize";
// import sequelize from "../database.config";
// import { v4 as uuidV4 } from "uuid";
// import { HasManyCreateAssociationMixin } from "sequelize";
// interface UserAttributes{
//     id: string;
//     authorName: string;
//     email:string;
//     password: string;
//     phoneNumber: string,
// }
// export class user extends Model <UserAttributes> {
//   static dataValues: any;
// }
// user.init({
//     id: {
//         type: DataTypes.TEXT,
//         defaultValue: () => uuidV4(),
//         allowNull: false,
//         primaryKey: true,
//     },
//     authorName: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     phoneNumber: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// },{
//     sequelize,
//     modelName: 'user'
// });
// user.hasMany(books, {foreignKey: 'authorId'});
