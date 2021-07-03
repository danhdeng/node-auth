const User=require("../models/User");
const ErrorResponse=require("../utils/errorResponse");
const sendEmail =require("../utils/sendEmail");
const cryto=require("crypto");

exports.register=async (req, res, next)=>{
    const { username, email, password } = req.body;
    try{
        const user = await User.create({ username, email, password });
        // return res.status(201).json({
        //     success: true,
        //     user,
        // })
        sendToken(user, 201, res);
    }catch(error){
        console.log(error);
        return next(new ErrorResponse(error.message || "Server Error", 500));
    }
}

exports.login=async (req, res, next)=>{
   const {email, password} =req.body;

   if(!email || !password){
       return next(new ErrorResponse("please provide an email and password", 404));
   }
   try{
       const user=await User.findOne({email}).select("+password");

       if(!user){
        //    return res.status(400).json({
        //     success: false,
        //     errorr: "invalid credentials"
        return next(new ErrorResponse("invalid credentials", 401));
       };

       const isMatch=await user.matchPassword(password);
       if(!isMatch)
       {
        return next(new ErrorResponse("invalid credentials", 401));
     };

     sendToken(user, 200, res);
    // return res.status(200).json({
    //     success: true,
    //     user,
    // });
    

   }catch(error){
        console.log(error);
        // res.status(500).json({
        //     success: false,
        //     error: error.message,
        // });
        return next(new ErrorResponse(error.message || "Server Error", 500));
    }

}

exports.forgetPassowrd=async(req, res, next)=>{
    const {email} =req.body;
    console.log("email: ", email);
    try{
        const user=await User.findOne({email});
        console.log("user: ", user);
        if(!user){
            return next(new ErrorResponse("EMail could not be sent",404))
        }

        const resetToken=user.getResetPasswordToken();

        await user.save();

        const resetUrl=`http://localhost:3000/passwordreset/${resetToken}`;

        const message=`
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password</p>
            <a href=${resetUrl} clicktrackingoff>${resetUrl}</a>
        `
        try{
            await sendEmail({
                to: user.email,
                subject: "Password Reset Request",
                text: message
            });

            res.status(200).json({
                success: true,
                data: "Email Sent"
            });
        }catch(error){
            console.log(error);
            user.resetPasswordToken=undefined;
            user.resetPasswordExpire=undefined;
            await user.save();

            return next(new ErrorResponse("Email could not be sent",500));
        }
    }
    catch(error){
        next(error);
    }
}

exports.resetPassword=async (req, res, next)=>{
    console.log(req.params);
    try{
        const resetPasswordToken= cryto
            .createHash("sha256")
            .update(req.params.resetToken)
            .digest("hex");
        
        const user=await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: {$gt: Date.now()}
        });
        if(!user){
            return next(new ErrorResponse("Invalid Reset Token",400));
        }
        user.password=req.body.password;
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save();

        res.status(201).json({
            success: true,
            data: "Reset Password success"
        });
    }catch(error){
        next(error);
    }
}

const sendToken=(user, statusCode, res)=>{
    const token= user.getSignedToken();
    res.status(statusCode).json({
        success: true,
        token: token
    });
}