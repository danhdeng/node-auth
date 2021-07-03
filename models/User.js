const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const cryto=require("crypto");
const { reset } = require("nodemon");

const UserSchema=new mongoose.Schema({
    username:{
        type: String,
        required: [true, "please provide a user name"]
    },
    email:{
        type: String,
        required: [true, "please provide an email"],
        unique: true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
    },
    password:{
        type: String,
        required: [true, "please provide a password"],
        minlength: 6,
        select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

UserSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password, salt);
    next();

});

UserSchema.methods.matchPassword=async function(password){
    
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedToken= function(){
    return jwt.sign({id: this._id}, 
        process.env.JWT_SECRET, {
            expiresIn:process.env.JWT_EXPIRE
        });
}

UserSchema.methods.getResetPasswordToken=function(){
    const resetToken=cryto.randomBytes(35).toString("hex");
    this.resetPasswordToken=cryto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire=Date.now() + 10 *60 *1000;

    return resetToken;
}


const User=mongoose.model("User", UserSchema);

module.exports=User;