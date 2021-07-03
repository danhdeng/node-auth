//require("dotenv").config();

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './Config.env') })

const auth=require("./routes/auth");

const private=require("./routes/private");

const express=require("express");

const app=express();

const connectDB=require("./config/db");

const errorHandler=require("./middleware/error");

connectDB();

app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/private", private);

app.use(errorHandler);
const PORT=process.env.PORT || 5000;

const server=app.listen(PORT, ()=>console.log(`server is listening on port ${PORT}`));

process.on("unhandledRejection", (err, promise)=>{
    console.log(`logged error: ${err}`);
    server.close(()=>process.exit(1));
})