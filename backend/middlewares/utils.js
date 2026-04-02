import jwt from "jsonwebstoken";

export const generateToken = (userId, res)=>{
    const token = jwt.sign({userId}, process.env.jwtToken,
        {expires: "7d"})
        res.cookie("jwt", token, {
            maxAge:7*24*60*60*1000,//in ms
            httpOnly:true,
            samSite:"strict",
            secure:process.env.node.env!="development"
        })
        return token;
}