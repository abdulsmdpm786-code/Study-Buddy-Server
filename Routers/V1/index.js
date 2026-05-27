import express from "express"
import userRouter from "./userRoutes.js"
import courseRouter from "./courseRoutes.js"
import contentRouter from "./contentRoutes.js"
import quizRouter from "./quizRouter.js"
import textRouter from "./textEditorRouter.js"


const v1Rotes = express.Router()

v1Rotes.use("/user", userRouter)
v1Rotes.use("/course", courseRouter)
v1Rotes.use("/course/content", contentRouter)
v1Rotes.use("/course/quiz", quizRouter)
v1Rotes.use("/textEditor", textRouter)

export default v1Rotes