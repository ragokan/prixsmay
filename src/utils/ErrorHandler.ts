import { NextFunction, Request, Response } from "express"
import { IError } from "../types/ErrorType"
import { IResponse } from "../types/ResponseTypes"
import ErrorObject from "./ErrorObject"
import { InlineType } from "./InlineType"

const ErrorHandler = (err: IError, _: Request, res: Response, __: NextFunction) => {
  res.status(err.statusCode || 500)
  console.log(err)
  res.json(
    InlineType<IResponse>({
      message: err.message || "Server Error",
      success: false,
    })
  )
}

const NotFound = (req: Request, _: Response, next: NextFunction) => {
  const NotFoundError = new ErrorObject(
    `The url '${req.originalUrl}' or the method '${req.method}' is not available!`,
    404
  )
  next(NotFoundError)
}

export { ErrorHandler, NotFound }
