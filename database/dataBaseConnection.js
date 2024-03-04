import mongoose from "mongoose";
import { config } from 'dotenv';
config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log("connected to mongodb");
            })
            .catch((err) => {
                console.error('Error Connecting...');
            });
    }
    catch (error) {

        console.error("Error Connecting...");
    }
}

// module.exports = {connectDB};
export { connectDB };