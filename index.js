const express=require("express");
const cors=require("cors")
require("dotenv").config();
const port=process.env.PORT||8080;



const connection=require("./config/db")
const authRouter=require("./routes/authRouter");
const userRouter=require("./routes/userRouter")
const app=express();

app.use(express.json());
app.use(cors())
app.use("/user",authRouter);
app.use("/getProfile",userRouter)

app.get("/",(req,res)=>{
    res.send("This is Base Point of API");
})



app.listen(port,async()=>{
    try {
        await connection;
        console.log("DB is connected")
    } catch (error) {
        console.log("DB is not conneted")
    }
    console.log(`server is running over ${port}`)
})