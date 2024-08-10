import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')

  if(!token){
      return res.status(401).json({error: 'unauthorized'})
  }
    try {
      jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
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
