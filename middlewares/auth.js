import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ message: "Access Denied: No token provided..." });

    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (error, decoded) => {
      if (error) return res.status(403).json({ message: "Invalid token..." });

      req.user = decoded;

      next();
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error in authentication...",
      error: error.message,
    });
  }
};

export default auth;
