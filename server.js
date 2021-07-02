require("dotenv").config({Path: "./config.env"});

const auth=require("./routes/auth");

const express=require("express");

const app=express();

const connectDB=require("./config/db");

connectDB();

app.use(express.json());

app.use("/api/auth", auth);
console.log(process.env.PORT);
const PORT=process.env.PORT || 5000;

const server=app.listen(PORT, ()=>console.log(`server is listening on port ${PORT}`));

process.on("unhandledRejection", (err, promise)=>{
    console.log(`logged error: ${err}`);
    server.close(()=>process.exit(1));
})