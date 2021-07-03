const jwt=require("jsonwebtoken");
const User=require("../models/User");
const ErrorRepsonse=require("../utils/errorResponse");


exports.protect=async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token=req.headers.authorization.split(" ")[1];
    }
    if(!token){
        return next(new ErrorRepsonse("Not authorize to access this route", 401));
    }

    try{
        const decode=jwt.verify(token, process.env.JWT_SECRET);
        const user=await User.findById(decode.id);
        if(!user){
            return next(new ErrorRepsonse("No user for this user id", 401));
        }
        req.user=user;
        next();
    }
    catch(error){
        console.log(error.message);
        return next(new ErrorRepsonse("Not authorize to access this route", 401));
    }
}