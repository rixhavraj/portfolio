import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./models/User.js";

const mongo_uri = process.env.mongoDB;
const admin_password = process.env.admin_passcode;
const admin_email = process.env.admin_email;

try{
mongoose.connect(mongo_uri).then(()=> console.log("DB connected")).catch(err => console.log(err));

async function createAdmin(){
    if(!admin_password || !admin_email){
        console.log("missing admin credentials");
            process.exit(1);
    }

    const existing = await User.findOne({email:admin_email});
    if(existing){
        console.log("Admin already existing");
        process.exit();
    }

    const hashed = await bcrypt.hash(admin_password, 10);

    await User.create({
        fullName:"admin",
        email:admin_email,
        password:hashed
    });

    console.log("Admin created");
    process.exit();
}

createAdmin();
}catch(err){
    console.log("found err", err);
}