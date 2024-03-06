import express from "express";
import {
  createBookHandler,
  deleteBookHandler,
  editBookHandler,
  getBookHandler,
  getBooksHandler,
} from "../controllers/bookCtrl";

const router = express.Router();

router.route("/").get(getBooksHandler);

router.route("/create").post(createBookHandler);

router.route("/:book_id").get(getBookHandler);

router.route("/:book_id/update").put(editBookHandler);

router.route("/:book_id/delete").delete(deleteBookHandler);

export default router;
