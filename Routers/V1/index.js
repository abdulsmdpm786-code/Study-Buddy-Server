import express from "express"
import userRouter from "./userRoutes.js"
import courseRouter from "./courseRoutes.js"


const v1Rotes = express.Router()

v1Rotes.use("/user", userRouter)
v1Rotes.use("/course", courseRouter)

export default v1Rotes