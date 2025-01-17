import jwt from "jsonwebtoken"
import { User } from "../models/User.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const verifyJWT = async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        // console.log(token);
        if (!token) {next();}
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            next();
        }
    
        req.user = user;
        next()
    } catch (error) {
        return res.status(401).json(new ApiResponse(401,error.message, error))
    }
    
};
