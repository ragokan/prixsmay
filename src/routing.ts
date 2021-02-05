import AuthRoutes from "./routes/AuthRoutes";
import PostRoutes from "./routes/PostRoutes";
import { Application } from "express";

export default (app: Application) => {
  app.use("/api/auth", AuthRoutes);
  app.use("/api/post", PostRoutes);
};
