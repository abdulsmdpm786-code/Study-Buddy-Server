import express from "express"
import { getWord } from "../../Controllers/dictionaryController.js"


const dictionaryRouter = express.Router()

dictionaryRouter.post('/get', getWord)

export default dictionaryRouter