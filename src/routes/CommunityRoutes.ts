import express from "express"
import { CreateCommunityFunction } from "../controllers/Community/CreateCommunityController"
import { GetCommunitiesFunction } from "../controllers/Community/GetCommunitiesController"
import { GetSingleCommunityFunction } from "../controllers/Community/GetSingleCommunityController"
import { LoginRequired, AdminRequired } from "../middleware/Authentication"

const router = express.Router()

router.route("").get(GetCommunitiesFunction).post(LoginRequired, AdminRequired, CreateCommunityFunction)
router.route("/:id").get(GetSingleCommunityFunction)

export default router
