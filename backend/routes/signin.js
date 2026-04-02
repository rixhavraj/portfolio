import { generateToken } from "../../../backand/config/utils";
import User from "..//models/User.js";

export const signin = async(req, res)=>{
    const{fullName, email, password} = req.body;

    try{
        if(!fullName || !email || !password){
            return res.status(400).json({message:"required all fields"});
        }
        if(password.length<6){
         alert("6 character password required");
         return res.status.json({message:"6 character password required"});
        }
        //check email is valid or not by using regix

        const user = await User.findOne({email});
        if(user){
            console.log("email already resistered");
            alert("Email already exist");
            return res.status(400).json({message:"email already exist"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedpassw = await bcrypt.hash(password, salt);

        const newuser = new User({fullName, email, password:hashedpassw});
        if(newuser){
            generateToken(newuser._id, res)
            await newuser.save();
            res.status(201).json({_id:newuser._id, fullName:newuser.fullName, email: newuser.email});
        }else{
            return res.status(400).json({message:"something wrong in the function"});
        }

    }catch(error){
        console.log("server error:", error.message);
        res.status(500).json({message:"server error"});
    }
}