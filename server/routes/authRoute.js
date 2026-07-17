import { registerUser, verifyEmail, loginUser } from "../controller/authController.js";
import express from "express"

const AuthRouter = express.Router()

AuthRouter.post("/register", registerUser)
AuthRouter.get("/verify-email", verifyEmail)
AuthRouter.post("/login", loginUser)

export default AuthRouter