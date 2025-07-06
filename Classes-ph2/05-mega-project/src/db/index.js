import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MONGO DB Connected");
        
    } catch (error) {
        console.log("Error in DB connection", error);
        process.exit(1)
    }
}

export default connectDB;