import express from "express"
import upload from "../../Middlewares/multer.js"
import { courseAdd } from "../../Controllers/courseController.js"


const courseRouter = express.Router()


courseRouter.post("/create" , upload.single("image"), courseAdd)



export default courseRouter