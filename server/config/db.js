import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoURL = process.env.MONGO_CNN;

const connectDB = async()=>{
    try{
        await mongoose.connect(mongoURL)
                console.log("MongoDB connected successfully");
    }catch(error){
        console.log("DB connection failed",error);
    }
}

export default connectDB;