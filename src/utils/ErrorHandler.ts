import { NextFunction, Request, Response } from "express";
import { ErrorType } from "../types/ErrorType";
import { ResponseJson } from "../types/ResponseJsonType";
import ErrorObject from "./ErrorObject";
import { InlineType } from "./InlineType";

const ErrorHandler = (err: ErrorType, _: Request, res: Response, __: NextFunction) => {
  res.status(err.statusCode || 500);
  res.json(
    InlineType<ResponseJson>({
      message: err.message || "Server Error",
      success: false,
    })
  );
};

const NotFound = (req: Request, _: Response, next: NextFunction) => {
  const NotFoundError = new ErrorObject(`The url you wanted to see '${req.originalUrl}' is not found`, 404);
  next(NotFoundError);
};

export { ErrorHandler, NotFound };
