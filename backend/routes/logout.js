

export const logout = (req, res)=>{
    try{
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message:"logout successfully"});
    }catch(error){
        console.log("internal error", error.message);
        alert("internal server error");
        res.status(500).json({messgage:"internal server error"})
    };
}