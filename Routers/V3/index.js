import express from "express"
import geminiRoutes from "./geminiRoutes.js"

const v3Rotes = express.Router()

v3Rotes.use('gemini', geminiRoutes)

export default v3Rotes