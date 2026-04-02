import mongoose from "mongoose";
import {connect}   from "mongoose";

export const connectDB = async()=>{
    const db = process.env.mongoDB;
    try{
        const conn = await mongoose.connect(db);
        if(!conn) throw new Error("Mongo db uri missing...")
            await connect(db, {});
        console.log("DB connected...", conn.connection.host);
    }catch(error){
        console.error("error found not connected", error);
        process.exit(1);
    }
}