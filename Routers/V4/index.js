import express from "express"
import todoRouter from "./todoNoteRouter.js"

const v4Routes = express.Router()


v4Routes.use("/todoNote", todoRouter)



export default v4Routes