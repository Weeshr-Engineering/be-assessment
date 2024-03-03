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
  authorSchema,
  loginSchema,
} from "../../../middlewares/validations/author.zod";

import { validationMiddleware } from "../../../middlewares/validator";

router.get("/", authMiddleware, getAuthors);
router.get("/:id", authMiddleware, getAuthor);
router.post("/", validationMiddleware(authorSchema), createAuthor);
router.put(
  "/:id",
  authMiddleware,
  validationMiddleware(authorSchema),
  updateAuthor
);
router.delete("/:id", authMiddleware, deleteAuthor);

router.post("/login", validationMiddleware(loginSchema), login);

router.get("/logout", (req, res) => {
  req.destroy();
  res.redirect("/");
});

module.exports = router;
