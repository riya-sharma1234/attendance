import mongoose from "mongoose"

const connectDB = async () => {
    let client = await mongoose.connect(process.env.MONGODB_ATLAS_URL);
    console.log(`MongoDB connected to ${client.connection.host}`);

}

export default connectDB;