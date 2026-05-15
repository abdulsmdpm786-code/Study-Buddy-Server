import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!verifyToken) {
      return res.status(404).json({ message: "Access denied" });
    }
    console.log("Access granted..");
    req.user = verifyToken.id;

    next();
  } catch (error) {
    res
      .status(error.status || 401)
      .json({ errMsg: error.message || "Authorization failed" });
  }
};

export default authUser;
