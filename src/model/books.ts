import mongoose from "mongoose";
import  user  from '../model/user';
import  category  from '../model/categories';


const bookSchema = new mongoose.Schema({
    Title: {type:String, required:true},
    Description:{type:String, required:true},
    pageCount: {type:String, required:true},
    Genre: {type:String, required:true},
    Publisher: {type:String, required:true},
    datePublished: {type:String, required:true},
    createdAt: {type: Date, default: Date.now},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

const books = mongoose.model("books", bookSchema);


export default books;










// import { Sequelize, DataTypes, Model } from "sequelize";
// import sequelize from "../database.config";

// interface bookAttributes{
//     Title: string;
//     Description:string;
//     pageCount: string;
//     Genre: string;
//     bookId: number;
//     Publisher: string;
//     datePublished: string;
//     authorId:string;
// }
// export class books extends Model 
// <bookAttributes> {}

// books.init({
//     Title: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     Description: {
//         type: DataTypes.STRING,
//         // allowNull: false
//     },
//     pageCount: {
//         type: DataTypes.STRING,
//         // allowNull: false
//     },
//     Genre: {
//         type: DataTypes.STRING,
//         // allowNull: false
//     },
//     Publisher: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     datePublished: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     // authorId: {
//     //     type: DataTypes.STRING,
//     //     allowNull: false,
//     // },
//     bookId: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true,
        
//     },

//     authorId: {
//         type: DataTypes.INTEGER,
//         references: {
//             model:user,
//             key: 'id'
//         },
//     }
    
// },
// {
//     sequelize,
//     modelName: 'books'

// });

// export default books;


























// export class Book extends Model {
//     public bookId!: string;
//     public userId!: number; // Foreign key from User model
  
//     static associate(models: any) {
//       // Define associations here
//       Book.belongsTo(models.User, { foreignKey: 'userId' }); // Book belongs to a User
//     }
//   }


// userId: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //       model: user,
    //       key: 'id', // This refers to the primary key 'id' in the User model
    //     },
    //   },