import connectRedis from "connect-redis";
import { Application } from "express";
import session from "express-session";
import { redis } from "./redis";

export default (app: Application) => {
  const RedisStore = connectRedis(session);
  app.use(
    session({
      store: new RedisStore({
        client: redis,
      }),
      name: "qid",
      secret: process.env.sessionSecret as string,
      resave: true,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 2, // 2 Hours
      },
    })
  );
};
