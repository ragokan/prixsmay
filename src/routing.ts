import AuthRoutes from "./routes/AuthRoutes"
import PostRoutes from "./routes/PostRoutes"
import UserRoutes from "./routes/UserRoutes"
import CommunityRoutes from "./routes/CommunityRoutes"
import { Application } from "express"
import { InlineType } from "./utils/InlineType"
import { IResponse } from "./types/ResponseTypes"

export default (app: Application) => {
  app.use("/api/auth", AuthRoutes)
  app.use("/api/post", PostRoutes)
  app.use("/api/user", UserRoutes)
  app.use("/api/community", CommunityRoutes)
  app.get("/", (_, res, __) =>
    res.status(200).json(
      InlineType<IResponse>({ message: "Prixsmay is running!", success: true })
    )
  )
}
