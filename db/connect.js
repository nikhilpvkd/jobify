import mongoose from "mongoose";

export const connectDB = (url) => {
    mongoose.set("strictQuery", false);
    return mongoose.connect(url);
};
