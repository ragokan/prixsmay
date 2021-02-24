import express from "express"
import { CreateCommunityFunction } from "../controllers/Community/CreateCommunityController"
import { LoginRequired, AdminRequired } from "../middleware/Authentication"

const router = express.Router()

router.route("").post(LoginRequired, AdminRequired, CreateCommunityFunction)

export default router
