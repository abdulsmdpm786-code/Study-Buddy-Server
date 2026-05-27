import express from "express"
import { createText, deleteText, editText, getText } from "../../Controllers/textEditorController.js"

const textRouter = express.Router()

textRouter.post("/create", createText) 
textRouter.patch("/:textParam/edit", editText)
textRouter.delete("/:textParam/delete", deleteText) 
textRouter.get("/get", getText)

export default textRouter