import express from "express"
import { handleSignIn, handleSignUP } from "../../Controllers/guestController.js"



const userRouter = express.Router()

userRouter.post("/signUp",  handleSignUP)
userRouter.post("/login",  handleSignIn)


export default userRouter