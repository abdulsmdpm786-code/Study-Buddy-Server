import { userModel } from "../Models/userModels.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const handleSignUP = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (
      name.trim().length === 0 ||
      email.trim().length === 0 ||
      password.trim().length === 0
    ) {
      return res.status(400).json({ errMsg: "All fields are required" });
    }

    const existUser = await userModel.findOne({ email });
    
    if (existUser) {
      return res.status(400).json({ errMsg: "User Already Exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await userModel.create({
        name: name,
        email: email,
        password: hashedPassword
    })
    return res.status(200).json({message: "User Created...."})

  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ errMsg: error.message || "Internal Server Error" });
  }
};

const handleSignIn = async(req, res)=>{
  try {
    const {email, password} = req.body

    if(email.trim().length === 0 || password.trim().length === 0){
      return res.status(400).json({errMsg: "All fields are required"})
    }

    const findUser = await userModel.findOne({email})
    if(!findUser){
      return res.status(400).json({errMsg: "User Not Found"})
    }

    const isMatch = await bcrypt.compare(password, findUser.password)
    if(!isMatch){
      return res.status(400).json({errMsg: "Invalid password"})
    }

    const token = jwt.sign(
     { id:findUser._id,
      role:findUser.role
    },
    process.env.JWT_SECRET_KEY,
    {expiresIn: "1hr"}
    )

    res.cookie("token", token)
    return res.status(200).json({message: "Login Successful", findUser})

  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ errMsg: error.message || "Internal Server Error" });
  
  }
}

const handleLogout = async(req, res)=>{
  try {
    
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ errMsg: error.message || "Internal Server Error" });
  }
}

export {
    handleSignUP,
    handleSignIn
} 

