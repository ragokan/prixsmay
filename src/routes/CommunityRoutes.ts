import express from "express"
import { CreateCommunityFunction } from "../controllers/Community/CreateCommunityController"
import { DeleteCommunityFunction } from "../controllers/Community/DeleteCommunityController"
import { GetCommunitiesFunction } from "../controllers/Community/GetCommunitiesController"
import { GetSingleCommunityFunction } from "../controllers/Community/GetSingleCommunityController"
import { JoinCommunityFunction } from "../controllers/Community/Member/JoinCommunityController"
import { LeaveCommunityFunction } from "../controllers/Community/Member/LeaveCommunityController"
import { UpdateCommunityFunction } from "../controllers/Community/UpdateCommunityController"
import { AdminRequired, LoginRequired } from "../middleware/Authentication"

const router = express.Router()

router.route("").get(GetCommunitiesFunction).post(LoginRequired, AdminRequired, CreateCommunityFunction)
router
  .route("/:id")
  .get(GetSingleCommunityFunction)
  .patch(LoginRequired, AdminRequired, UpdateCommunityFunction)
  .delete(LoginRequired, AdminRequired, DeleteCommunityFunction)
router.route("/join/:id").post(LoginRequired, JoinCommunityFunction)
router.route("/leave/:id").post(LoginRequired, LeaveCommunityFunction)

export default router
