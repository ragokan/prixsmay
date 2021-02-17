import { v4 } from "uuid"
import { confirmMailConstant, forgotPasswordConstant } from "../constants/RedisConstants"
import { redis } from "../redis"

export const CreateCONFIRMATION_URL = async (userId: number | string): Promise<string> => {
  const token = v4()
  await redis.set(confirmMailConstant + token, userId, "ex", 60 * 60 * 24)
  return `${process.env.CONFIRMATION_URL}/${token}`
}

export const CreatePasswordResetUrl = async (userId: number | string): Promise<string> => {
  const token = v4()
  await redis.set(forgotPasswordConstant + token, userId, "ex", 60 * 60 * 24)
  return `${process.env.MAIL_RESET_URL}/${token}`
}
