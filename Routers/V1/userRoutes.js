import express from "express"
import { handleAuth, handleLogout, handleSignIn, handleSignUP, registerUser, verifyOtp } from "../../Controllers/guestController.js"


const userRouter = express.Router()

userRouter.post("/register", registerUser) 
userRouter.post("/registerOtp", verifyOtp)

userRouter.post("/signUp",  handleSignUP)
userRouter.post("/login",  handleSignIn)
userRouter.post("/logOut",  handleLogout)

userRouter.get("/checkAuth", handleAuth)



export default userRouter