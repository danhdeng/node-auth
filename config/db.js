require('dotenv').config();
const mongoose=require("mongoose");

const connectDB=async()=>{
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    });
    console.log("MongoDB connected")
}

module.exports=connectDB;