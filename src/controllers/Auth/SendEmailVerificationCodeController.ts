import { RequestContext, ResponseContext } from "../../types/ExpressTypes"
import { CreateCONFIRMATION_URL } from "../../utils/CreateMailUrl"
import ErrorObject from "../../utils/ErrorObject"
import { SendEmail } from "../../utils/SendMail"
import Async from "../../middleware/Async"
import { NextFunction } from "express"
import { User } from "../../database"
import { InlineType } from "../../utils/InlineType"
import { IUserResponse } from "../../types/ResponseTypes"
import { EmailBodyType, EmailValidation } from "../../validation/EmailValidation"

interface ReqBody extends RequestContext {
  body: EmailBodyType
}

export const SendEmailVerificationCodeFunction = Async(
  async (req: ReqBody, res: ResponseContext, next: NextFunction) => {
    const { error } = EmailValidation(req.body)
    if (error) return next(new ErrorObject(error.details[0].message, 400))

    const user = await User.findUnique({ where: { email: req.body.email } })
    if (user?.isActivated) return next(new ErrorObject("Email is already activated", 400))

    if (user && !process.env.testMode) await SendEmail(user.email, await CreateCONFIRMATION_URL(user.id))

    res.status(201).json(
      InlineType<IUserResponse>({
        message: "Mail is sent successfully!",
        success: true,
      })
    )
  }
)
