import jwt from "jsonwebtoken"

const authAdmin = (req, res, next)=>{
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(404).json({errMsg: "Authorization failed"})
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if(verifyToken.role !== "admin"){
            return res.status(400).json({errMsg: "Access Denied"})
        }

        req.admin = verifyToken.id
        console.log("this is admin id", req.admin);
        console.log("Access granted..");
        

        next()

    } catch (error) { res.status(error.status || 401).json({errMsg: error.message || "Authorization failed"})
       

    }
}

export default authAdmin