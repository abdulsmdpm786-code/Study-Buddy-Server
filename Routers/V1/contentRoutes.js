import express from "express"
import { addContent, deleteContent, editContent, getContent } from "../../Controllers/contentController.js"



const contentRouter = express.Router()

contentRouter.post("/:courseId/create", addContent)
contentRouter.get("/:courseId/get", getContent)
contentRouter.patch("/:contentId/edit", editContent) 
contentRouter.delete("/:contentId/delete", deleteContent)

export default contentRouter