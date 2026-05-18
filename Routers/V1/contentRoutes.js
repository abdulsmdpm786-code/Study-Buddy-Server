import express from "express"
import { addContent, getContent } from "../../Controllers/contentController.js"



const contentRouter = express.Router()

contentRouter.post("/:courseId/create", addContent)
contentRouter.get("/:courseId/get", getContent)

export default contentRouter