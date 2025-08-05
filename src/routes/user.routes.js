import { Router } from "express";
import { logedIn, registration } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js"

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registration);

    router.route("/login").post(logedIn)

export default router;