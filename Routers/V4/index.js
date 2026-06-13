import express from "express"
import todoRouter from "./todoNoteRouter.js"

const v4Router = express.Router()


v4Router.use("/todoNote", todoRouter)



export default v4Router