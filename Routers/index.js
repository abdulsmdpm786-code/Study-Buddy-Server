import express from "express"
import v1Rotes from "./V1/index.js"
import v2Rotes from "./V2/index.js"
import v3Rotes from "./V3/index.js"
import v4Routes from "./V4/index.js"



const apiRouter = express.Router()


apiRouter.use("/v1", v1Rotes)
apiRouter.use("/v2", v2Rotes)
apiRouter.use("/v3", v3Rotes)
apiRouter.use("/v4", v4Routes)

export default apiRouter 