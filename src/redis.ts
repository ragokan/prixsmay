import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

export const redis = new Redis({
  host: process.env.redisHost as any,
  port: process.env.redisPort as any,
  password: process.env.redisPassword as any,
});
