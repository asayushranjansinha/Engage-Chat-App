import mongoose from "mongoose";

let isConnected = false // Track the connection
const MONGODB_URI = process.env.MONGODB_URI as string;
const DB_NAME = process.env.DB_NAME as string;

export const connectDB = async () => {
    try {
        if (isConnected) {
            console.log("MongoDB is already connected!")
            return
        }
        const connectionInstance = await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        isConnected = true;
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}