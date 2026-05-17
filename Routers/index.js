import express from "express"
import v1Rotes from "./V1/index.js"


const apiRouter = express.Router()


apiRouter.use("/v1", v1Rotes)

export default apiRouter 