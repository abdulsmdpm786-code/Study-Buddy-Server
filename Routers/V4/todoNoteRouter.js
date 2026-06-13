import express from "express"
import { addTodo, deleteTodo, editTodo, getTodo } from "../../Controllers/todoController.js"


const todoRouter = express.Router()


todoRouter.post("/add", addTodo)
todoRouter.put("/:noteId", editTodo) 
todoRouter.delete("/:noteId", deleteTodo) 
todoRouter.get("/get", getTodo)

export default todoRouter