import { Request, Response, NextFunction, RequestHandler } from "express";

import prisma from "../utils/prisma";

import { ResponseHandler } from "../utils/responseHandler";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  InternalServerError,
} from "../middlewares/errorhandler";

export const createAuthor: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, fullname, password, confirmPassword, bio } = req.body;

    if (password !== confirmPassword) {
      throw new BadRequestError("Passwords do not match");
    }

    if (!email && !fullname && !password) {
      throw new BadRequestError("Email, Fullname and Password are required");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const author = await prisma.author.create({
      data: {
        email,
        fullname,
        password: hashPassword,
        bio,
      },
      select: {
        id: true,
        email: true,
        fullname: true,
        bio: true,
        created_at: true,
        updated_at: true,
      },
    });

    ResponseHandler.success(res, author, 201, "Author created successfully");
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.author.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const userRes = {
      id: user.id,
      email: user.email,
      fullname: user.fullname,
      bio: user.bio,
      token: token,
    };

    ResponseHandler.success(res, userRes, 200, "User logged in successfully");
  } catch (error) {
    next(error);
  }
};

export const getAuthors: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authors = await prisma.author.findMany({
      select: {
        id: true,
        email: true,
        fullname: true,
        bio: true,
        created_at: true,
        updated_at: true,
      },
    });

    ResponseHandler.success(
      res,
      authors,
      200,
      "Authors retrieved successfully"
    );
  } catch (error) {
    next(error);
  }
};

export const getAuthor: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorId } = req.params;

    console.log(authorId);

    const author = await prisma.author.findUnique({
      where: {
        id: parseInt(authorId),
      },
      select: {
        id: true,
        email: true,
        fullname: true,
        bio: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!author) {
      throw new NotFoundError("Author not found");
    }

    ResponseHandler.success(res, author, 200, "Author retrieved successfully");
  } catch (error) {
    next(error);
  }
};

export const updateAuthor: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorId } = req.params;
    const { email, fullname, bio } = req.body;

    const author = await prisma.author.update({
      where: {
        id: parseInt(authorId),
      },
      data: {
        email,
        fullname,
        bio,
      },
      select: {
        id: true,
        email: true,
        fullname: true,
        bio: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!author) {
      throw new NotFoundError("Author not found");
    }

    ResponseHandler.success(res, author, 200, "Author updated successfully");
  } catch (error) {
    next(error);
  }
};

export const deleteAuthor: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new BadRequestError("Author id is required");
    }

    const author = await prisma.author.delete({
      where: {
        id: parseInt(id),
      },
      include: {
        Book: true,
      },
    });

    ResponseHandler.success(res, author, 200, "Author deleted successfully");
  } catch (error) {
    next(error);
  }
};
