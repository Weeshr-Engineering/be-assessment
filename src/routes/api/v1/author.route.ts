import { Router } from "express";
import {
  createAuthor,
  deleteAuthor,
  login,
  getAuthor,
  getAuthors,
  updateAuthor,
} from "../../../controllers/author.controller";

import { authMiddleware } from "../../../middlewares/auths";

const router = Router();

import {
  authorCreateSchema,
  authorUpdateSchema,
  loginSchema,
} from "../../../middlewares/validations/author.zod";

import { validationMiddleware } from "../../../middlewares/validator";

router.get("/authors/", authMiddleware, getAuthors);
router.get("/author/:authorId", authMiddleware, getAuthor);
router.post(
  "/register",
  validationMiddleware(authorCreateSchema),
  createAuthor
);
router.put(
  "/author/:authorId",
  authMiddleware,
  validationMiddleware(authorUpdateSchema),
  updateAuthor
);
router.delete("/author/:authorId", authMiddleware, deleteAuthor);

router.post("/login", validationMiddleware(loginSchema), login);

router.get("/logout", (req, res) => {
  req.destroy();
  res.redirect("/");
});

module.exports = router;
