import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('connection established');
    } catch (error) {
        console.log(error);
    }
}

export default connectToDb