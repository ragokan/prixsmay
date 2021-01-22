import { NextFunction, Request, Response } from "express";
import ErrorObject from "./ErrorObject";

const ErrorHandler = (err: ErrorType, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message);
  res.status(err.statusCode || 500);
  res.json({
    message: err.message || "Server Error",
  });
};

const NotFound = (req: Request, res: Response, next: NextFunction) => {
  const NotFoundError = new ErrorObject(`The url you wanted to see '${req.originalUrl}' is not found`, 404);
  next(NotFoundError);
};

export { ErrorHandler, NotFound };
