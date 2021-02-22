import { RegisterBodyType, RegisterValidation } from "../../validation/RegisterValidation"
import { RequestContext, ResponseContext } from "../../types/ExpressTypes"
import { CreateCONFIRMATION_URL } from "../../utils/CreateMailUrl"
import ErrorObject from "../../utils/ErrorObject"
import { SendEmail } from "../../utils/SendMail"
import Async from "../../middleware/Async"
import { NextFunction } from "express"
import { User } from "../../database"
import bcrypt from "bcryptjs"
import { InlineType } from "../../utils/InlineType"
import { IUserResponse } from "../../types/ResponseTypes"
import { omit } from "lodash"
import { userIncludeOptions } from "../User/Utils/UserIncludeOptions"
import { Body } from "node-fetch"
import { defaultUserPictureUrl } from "../../constants/CloudinaryConstants"

interface ReqBody extends RequestContext {
  body: RegisterBodyType
}

export const RegisterFunction = Async(async (req: ReqBody, res: ResponseContext, next: NextFunction) => {
  const { error } = RegisterValidation(req.body)
  if (error) return next(new ErrorObject(error.details[0].message, 400))

  const userCheck = await User.findFirst({
    where: { OR: [{ email: req.body.email }, { username: req.body.username }] },
  })
  if (userCheck) return next(new ErrorObject("Username or email is already in use!", 400))

  const password = await bcrypt.hash(req.body.password, 11)

  let user = await User.create({
    data: {
      email: req.body.email,
      username: req.body.username.trim(),
      password,
      profile: { create: { picture: req.body.pictureUrl ? req.body.pictureUrl : defaultUserPictureUrl } },
    },
    include: userIncludeOptions,
  })

  if (!process.env.testMode) await SendEmail(user.email, await CreateCONFIRMATION_URL(user.id))

  const filteredUser = omit(user, ["type", "password"])

  res.status(201).json(
    InlineType<IUserResponse>({
      message: "User is created successfully!",
      success: true,
      user: filteredUser,
    })
  )
})
