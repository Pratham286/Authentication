import mongoose from "mongoose";
import dotenv from "dotenv";
// import mongoose from "mongoose";

// const mongoose = mongoose;
// const dotenv = dotenv;  
dotenv.config();

export const connectToDB = async ()=> {
    try {
        await mongoose.connect(process.env.mongo_URL);
        console.log("Connected To Database");
    } catch (error) {
        console.error("Failed to connect to Database");
        process.exit(1);
    }
};
// export connetToDB;