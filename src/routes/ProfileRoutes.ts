import express from "express"
import { GetPublicProfileFunction } from "../controllers/Profile/GetPublicProfileController"

const router = express.Router()

router.route("/:id").get(GetPublicProfileFunction)

export default router
