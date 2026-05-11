import express from "express"
import dotenv from "dotenv"
import connectDB from "./Config/dbConfig.js"
import apiRouter from "./Routers/index.js"
import cookieParser from "cookie-parser"


const app = express()
dotenv.config()
connectDB()
app.use(express.json())
app.use(cookieParser())


app.use("/api", apiRouter)

const port = process.env.PORT
app.listen(process.env.PORT, ()=>{
    console.log(`Server running on ${port}....`); 
})