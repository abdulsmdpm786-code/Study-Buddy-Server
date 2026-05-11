import express from "express"
import userRouter from "./userRoutes.js"


const v1Rotes = express.Router()

v1Rotes.use("/user", userRouter)

export default v1Rotes