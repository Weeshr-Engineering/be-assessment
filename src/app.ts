import {config} from 'dotenv';
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';
import { expressjwt } from 'express-jwt';
// import sqlite3, { verbose } from 'sqlite3';//.verbose();
// import { Sequelize, DataTypes } from 'sequelize';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

//import routes
import indexRouter from  './routes/index';
import usersRouter from './routes/author';
import booksRouter from './routes/books';
import register from './routes/register';
import categoriesRouter from './routes/categories';

const app = express();

config();

const db = process.env.DATABASE_URL as string;

mongoose.connect(db)
.then(() => {console.log("Connected to MongoDB");
}).catch((err) => {
  console.log("Not Connected to MongoDB", err);
});



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../', 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));




// view engine setup
app.set('views', path.join(__dirname, "../", 'views'));
app.set('view engine', 'ejs');


app.use('/', indexRouter)
app.use('/user', usersRouter);
app.use('/books', booksRouter);
app.use('/categories', categoriesRouter);


app.get('/index', (req, res) => {
  res.render('index', { title: 'Home Page' });
});

app.get(`/books`, (req, res) => {
  res.render('books')
})

app.get(`/register`, (req, res) => {
  res.render('register')
})



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



// app.listen(3000, (res, req) => {
//   console.log("App is listening on port 3000")
// })

export default app;






// db.sync({force:true}).then(() => {
//   console.log("database synced")
// db.sync().then(() => {
//   console.log("database synced")
// })
// .catch((err) => {
//   console.log("failed to sync");
// });




// app.get(`/loginUser`, (req, res) => {
//   res.render('user')
// })

// app.get('/index', (req, res) => {
//   res.json({ message: "Home Page"})
// })






















// const user = {
//   AuthorName: "Barack Obama",
//   email:"mk@gmail.com",
//   password: "yourpassword",
//   PhoneNumber:"4198889999000033",

// books:[
//    {
//       Title: "A Promised Land",
//       datePublished: "2020-0-12T19:0455.455z",
//       Description:  "A Promised Land is a memoir by Barack Obama, the 44th President of the United States from 2009 to 2017. Published on November 17, 2020, it is the first of a planned two-volume series",
//       pageCount: "768",
//       Genre: "autobiography",
//       bookId: "1",
//       Publisher: "Crown"
//   }
// ]
// }





// app.post("/", (req, res) => {
//   const inputTitle = req.body.Title
//   const inputDatePublished = req.body.datePublished
//   const inputDescription = req.body.Description
//   const inputPageCount = req.body.pageCount
//   const inputGenre = req.body.Genre
//   const inputPublisher = req.body.Publisher

//     books:String.push({
//       Title: inputTitle,
//       datePublished: inputDatePublished,
//       Description: inputDescription,
//       pageCount: inputPageCount,
//       Genre: inputGenre,
//       Publisher: inputPublisher
//     })

//     res.render("index", {
//       user: books
//     })

// })

// app.post('/view', (req, res) => {
//   var requestedTitle = req.body.Title;
//   books.forEach(book => {
//     if (book.Title == requestedTitle){
//       Description = "A Promised Land is a memoir by Barack Obama, the 44th President of the United States from 2009 to 2017. Published on November 17, 2020, it is the first of a planned two-volume series";
//     }
//   })
//   res.render("index",{
//     user: books
//   })
// })


// app.post('/edit', (req, res) => {
//   var requestedTitle = req.body.Title;
//   books.forEach(book => {
//     if (book.Title == requestedTitle){
//       Description = "A Promised Land is a memoir by Barack Obama, the 44th President of the United States from 2009 to 2017. Published on November 17, 2020, it is the first of a planned two-volume series";
//     }
//   })
//   res.render("index",{
//     user: books
//   })
// })


// app.post('/delete', (req, res) => {
//   var requestedTitle = req.body.Title;
//   var j = 0;
//   books.forEach(book => {
//     j = j + 1;
//     if (book.Title == requestedTitle){
//       books.splice((j-1), 1)
//     }
//   })
//   res.render("index", {
//     user: books
//   })
// })




// app.use('/books', authenticate, booksRouter);


// app.get("/register", (req, res) =>{
//   res.render("register", {title: 'register' })
// })











