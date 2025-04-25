import mongoose from "mongoose";
import config from "../config/config.js";

const connectDB = async () => {
            const connect = await mongoose.connect(config.MONGO_URI)
            if (connect.ConnectionStates.connected) {
                        console.log("Database is connected")
            } else {
                        console.log("Databas is not connected")
            }
}


export default connectDB;