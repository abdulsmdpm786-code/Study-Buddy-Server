import express from "express"
import { getChat } from "../../Controllers/geminiChat.js"

const geminiRoutes = express.Router()

geminiRoutes.post('/chat', getChat)

export default geminiRoutes