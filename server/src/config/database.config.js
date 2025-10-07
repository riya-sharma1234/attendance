import mongoose from "mongoose"

const connectDB = async () => {
    if (!process.env.MONGODB_ATLAS_URL) {
        throw new Error("MONGODB_ATLAS_URL not defined in .env");
    }
    let client = await mongoose.connect(process.env.MONGODB_ATLAS_URL);
    console.log(`MongoDB connected to ${client.connection.host}`);

}

export default connectDB;