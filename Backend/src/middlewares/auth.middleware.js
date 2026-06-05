import jwt from "jsonwebtoken";
import config from "../config/config.js";
import userModel from "../models/user.model.js";

export const authenticateUser= async (req, res, next)=>{
  const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try{
        const decoded = jwt.verify(token, config.jwtSecret);
        const user = await userModel.findById(decoded.id);
        if (!user) {    
            return res.status(401).json({ message: "Unauthorized" });
        }
        
        req.user = user;
        next();

    } catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
}

export const authenticateSeller = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try{
        const decoded = jwt.verify(token, config.jwtSecret);
        const user = await userModel.findById(decoded.id);
        if (!user) {    
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (user.role !== "seller") {
            return res.status(403).json({ message: "Forbidden: Only sellers can perform this action" });
        }
        req.user = user;
        next();

    } catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
}