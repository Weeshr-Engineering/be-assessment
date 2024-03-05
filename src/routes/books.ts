import express,{ Request, Response, NextFunction } from 'express';
// import { Sequelize, Model, DataTypes } from 'sequelize';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import {
    createBook,
    updateBookById,
    deleteBook,
} from '../controller/books';

import books from '../model/books';
import { authorize } from '../middleware/middleware';
import { string } from 'zod';

interface AuthRequest extends Request {
  user?: { id: string };
}

const secret: any = process.env.secret

const router = express.Router();

/* GET users listing. */

  router.get('/',async (req:Request, res:Response, next: NextFunction) => {
    try{
      const book = await books.find({})

      res.status(200).json( {  books:book});
      // res.status(200).render("books", { book });
    }   catch (error) {
      res.status(500).json({message: 'server error'})
      // res.status(500).render("books", {message: 'server error'})
    }
  });

   router.get('/adminBooks/:id',async (req: Request, res: Response) => {
      try{
        const book = await books.findById(req.params.id);
        if (book) {
          res.status(200).json(book)
        } else {
          res.status(404).json({message: 'book not found'});
        }

      } catch (error) {
        res.status(500).json({message: 'server error'})
      }
   });

  router.post('/adminBooks', authorize, createBook);
  router.put('/adminBooks/:id', authorize,  updateBookById);
  router.delete('/adminBooks/:id', authorize, deleteBook);

  export default router;



