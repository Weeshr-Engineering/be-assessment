import express, { Request, Response, NextFunction } from "express";
import sequelize from "../database.config";
import { registerUser, loginUser } from "../controller/author";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import findAll from "../model/author";
import user from "../model/author";

const router = express.Router();

/* GET users listing. */
router.get(
  "/registerUser",
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).render("register to begin");
  }
);

// router.get('/loginUser', async (req:Request, res:Response, next:NextFunction) => {
//   res.status(200).render('login')
// });

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await user.find();
    // attributes: { exclude: ['password'] }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await user.findById(req.params.id);
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await user.findById(req.params.id);
    if (users) {
      await users.updateOne(req.body);
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await user.findById(req.params.id);
      if (users) {
        await users.deleteOne();
        res.status(200).json({ status: "success", message: "User deleted" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "server error" });
    }
  }
);

export default router;

// router.post("/new_book", (req, res, next) => {
//   sequelize.Books.create(req.body).then(function() {
//       res.redirect("/all_books");
//     })
//     .catch(function(err:any) {
//       if (err.name === "SequelizeValidationError") {
//         res.render("./books/new_book", { books: sequelize.Books.build(req.body), errors: err.errors })
//       }
//     });
// });

// import express from 'express';
// import { registerUser, loginUser } from '../controller/user.controller';

// const router = express.Router();

// // Define user routes
// router.post('/register', registerUser);
// router.post('/login', loginUser);

// export default router;
