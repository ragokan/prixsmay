import express from "express"
import { UploadImageFunction } from "../controllers/Util/UploadImageController"
import { LoginRequired } from "../middleware/Authentication"

const router = express.Router()

router.route("/uploadImage").post(LoginRequired, UploadImageFunction)

export default router
