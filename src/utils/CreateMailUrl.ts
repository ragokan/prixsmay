import { v4 } from "uuid";
import { confirmMailConstant, forgotPasswordConstant } from "../constants/RedisConstants";
import { redis } from "../redis";

export const CreateConfirmationUrl = async (userId: number | string): Promise<string> => {
  const token = v4();
  await redis.set(confirmMailConstant + token, userId, "ex", 60 * 60 * 24);
  return `${process.env.confirmationUrl}/${token}`;
};

export const CreatePasswordResetUrl = async (userId: number | string): Promise<string> => {
  const token = v4();
  await redis.set(forgotPasswordConstant + token, userId, "ex", 60 * 60 * 24);
  return `${process.env.mailResetUrl}/${token}`;
};
