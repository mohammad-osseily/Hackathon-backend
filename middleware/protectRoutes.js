import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export const adminProtect = (req, res, next) => {
  try {
      if (req.user && req.user.role === 'admin') {

          next();

      } else {
          console.log(req.user)
          return res.status(403).json({ message: 'Access denied: Admins only.' });
      }
  } catch (error) {
      return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};
