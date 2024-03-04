import express , { Router} from "express";
import { createAuthor , updateAuthorById , deleteAuthorById , getAuthorById , getAllAuthors , loginAuthor} from "../controllers/authorController";

const router : Router = express.Router();

router.post("/create" , createAuthor)
router.post("/login" , loginAuthor)
router.get("all" , getAllAuthors)
router.get("/:bookId" ,getAuthorById)
router.put("/update/:bookId" ,updateAuthorById)
router.delete("/delete/:bookId" , deleteAuthorById)

export default router