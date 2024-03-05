import { Request, Response } from 'express';
import books from '../model/books';
import { authorize } from '../middleware/middleware';
import user from '../model/user';


interface AuthRequest extends Request {
  user?: { id: string };
}

export const createBook = async (req: AuthRequest, res: Response) => {
  try {
    const { Title, datePublished, Description, pageCount, Genre, Publisher, category, bookId } = req.body;

    // Get the author ID from the authenticated user
    const authorId = req.user?.id;

    // Check if authorId exists (user is authenticated)
    if (!authorId) {
      return res.status(401).json({ status: 'failed', message: 'Unauthorized' });
    }

    const newBook = await books.create({
      Title,
      datePublished,
      Description,
      pageCount,
      Genre,
      Publisher,
      category,
      authorId, // Assign the author ID to the book
      bookId,
    });

    if (!newBook) {
      return res.status(400).json({
        status: 'failed',
        message: 'Invalid entry',
      });
    }

    res.status(201).json({
      status: 'success',
      message: 'Book has been uploaded',
      book: newBook, // Return the newly created book
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const updateBookById = async (req: AuthRequest, res: Response) => {
  try {
    const updateBook = await books.findById(req.params.id);
    if (updateBook) {
      await updateBook.updateOne(req.body);
      res.status(200).json({ message: 'Book updated successfully', book: updateBook });
    } else {
      res.status(404).json({ message: 'Book not found' });
      return
    } 
  } catch (error) {
      res.status(400).json({ message: 'Internal server error' });
      return;
    }
  }


export const deleteBook = async (req: AuthRequest, res: Response) => {
  try {
    const deletedBook = await books.findById(req.params.id);
    if (deletedBook) {
      await deletedBook.deleteOne();
      res.status(200).json({ message: 'Book deleted successfully', book: deletedBook });
      return;
    } else{
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};








// import { bookData } from '../utilities/books';
// import { ZodError } from 'zod'; // Import ZodError from zod


// export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const book = await books.findAll();
//     res.status(200).json({ books });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// export const getBookById = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const book = await books.findByPk(id);
//     if (!book) {
//       res.status(404).json({ message: 'Book not found' });
//       // return;
//     }
//     res.status(200).json({ book });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };


//     const validatedData = bookData;

//     const newBook = await books.create(validatedData);
//     res.status(201).json({ message: 'Book created successfully', book: newBook });
//   } catch (error) {
//     if (error instanceof ZodError) {
//       res.status(400).json({ error: error.errors });
//       // return;
//     }
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// interface AuthRequest extends Request {
//   user?: { id: string };
// }


// export const createBook = async (req: AuthRequest, res: Response) => {
//   // try {
//     const { Title, datePublished, Description, pageCount, Genre, Publisher, authorId, bookId } = req.body;

//     const newbook = books.create({
//       Title,
//       datePublished,
//       Description,
//       pageCount,
//       Genre,
//       Publisher,
//       authorId,
//       bookId
//     });

//     if (!newbook){
//       return res.status(400).json({
//         status: 'failed', message: 'Invalid entry',
//       });
//     }

//     res.status(201).json({status: 'success', message:'book has been uploaded',
//     books: {Title, datePublished, Description, pageCount, Genre, Publisher, authorId, bookId},
//   });
// }
