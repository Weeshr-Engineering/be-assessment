import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError, ZodIssue } from "zod";
import { BadRequestError } from "../middlewares/error";

export const validationMiddleware = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = mapZodErrorToValidationError(error);
        next(new BadRequestError(validationError));
      } else {
        next(error);
      }
    }
  };
};

const mapZodErrorToValidationError = (error: ZodError): string => {
  const issues = error.issues.map(mapZodIssue);
  const issuesCount = issues.length;
  const issuesMessage = issues
    .map(
      (issue, index) => `Issue ${index + 1}: ${issue.message} in ${issue.path}`
    )
    .join(", ");

  return `validationError: "issues": ${issuesCount}, ${issuesMessage}`;
};

const mapZodIssue = (issue: ZodIssue): any => {
  return {
    message: issue.message,
    path: issue.path.join("."),
  };
};