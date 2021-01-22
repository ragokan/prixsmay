import AuthRoutes from "./routes/AuthRoutes";
import { Application } from "express";

export default (app: Application) => {
    app.use("/api/auth", AuthRoutes);
};
