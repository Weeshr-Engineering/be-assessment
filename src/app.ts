import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import * as dotenv from "dotenv";
import indexRouter from "./routes/index";
import authorRouter from "./routes/authorRouter";
import bookRouter from "./routes/bookRouter";
import categoryRouter from "./routes/categoryRouter";
import sequelize from "./config/database.config";

dotenv.config();
const app = express();

// Set up mongoose connection
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database created successfully");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

// view engine setup
app.set("views", path.join(__dirname, "../", "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", authorRouter);
app.use("/books", bookRouter);
app.use("/categories", categoryRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

export default app;
