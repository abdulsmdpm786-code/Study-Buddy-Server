import express from "express"
import { handleAuth, handleLogout, handleSignIn, handleSignUP } from "../../Controllers/guestController.js"



const userRouter = express.Router()

userRouter.post("/signUp",  handleSignUP)
userRouter.post("/login",  handleSignIn)
userRouter.post("/logOut",  handleLogout)

userRouter.get("/checkAuth", handleAuth)


export default userRouter