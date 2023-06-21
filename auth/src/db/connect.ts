import mongoose from "mongoose";

export const connectDB = () => {
    return mongoose.connect("mongodb://auth-mongo-srv:27017/db")
}