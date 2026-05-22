import express from "express"
import { getAll, quizAdd, quizDelete, quizFind } from "../../Controllers/quizController.js"



const quizRouter = express.Router()


quizRouter.post("/:courseId/create", quizAdd)
quizRouter.get("/:courseId/find", quizFind)
quizRouter.delete("/:courseId/delete", quizDelete)
quizRouter.get("/getAll", getAll)

export default quizRouter