import { ErrorHandler, NotFound } from "./utils/ErrorHandler";
import formData from "express-form-data";
import connectRedis from "connect-redis";
import session from "express-session";
import { prisma } from "./database";
import { redis } from "./redis";
import routing from "./routing";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

(async () => {
  try {
    await prisma.$connect().then(() => console.log("Successfully connected to the database!"));

    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(formData.parse());

    // Sessions
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

    // Routes
    routing(app);

    // Middleware
    app.use(NotFound);
    app.use(ErrorHandler);

    // Server
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => console.log(`The server is currently running on port ${PORT}!`));
  } catch (error) {
    console.log(error.message);
  }
})();
