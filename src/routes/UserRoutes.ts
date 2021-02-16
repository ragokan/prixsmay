import express from "express"
import { AddProfileFunction } from "../controllers/User/AddProfileController"
import { LoginRequired } from "../middleware/Authentication"
import { GetUserFunction } from "../controllers/User/GetUserController"

const router = express.Router()

router.route("").get(LoginRequired, GetUserFunction)
router.route("/addProfile").post(LoginRequired, AddProfileFunction)

export default router
