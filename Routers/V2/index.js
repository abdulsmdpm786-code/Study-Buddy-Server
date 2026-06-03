import express from "express"
import dictionaryRouter from "./dictionaryRoutes.js"


const v2Rotes = express.Router()


v2Rotes.use('/dictionary', dictionaryRouter)


export default v2Rotes