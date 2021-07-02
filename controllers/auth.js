const User=require("../models/User");


exports.register=async (req, res, next)=>{
    const { username, email, password } = req.body;
    try{
        const user = await User.create({ username, email, password });
        return res.status(201).json({
            success: true,
            user,
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
    // res.send("Register Route");
}

exports.login=(req, res, next)=>{
    res.send("Log Route");
}

exports.forgetPassowrd=(req, res, next)=>{
    res.send("Forgot password Route");
}

exports.resetPassword=(req, res, next)=>{
    res.send("Reset password Route");
}