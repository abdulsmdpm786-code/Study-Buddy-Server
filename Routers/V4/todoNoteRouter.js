import express from "express"
import { addTodo } from "../../Controllers/todoController.js"


const todoRouter = express.Router()


todoRouter.post("/", addTodo)


export default todoRouter