const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    username:{
        type: String,
        require: [true, "please provide a user name"]
    },
    email:{
        type: String,
        require: [true, "please provide an email"],
        unique: true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
    },
    password:{
        type: String,
        require: [true, "please provide a password"],
        minlength: 6,
        select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

const User=mongoose.model("User", UserSchema);

module.exports=User;