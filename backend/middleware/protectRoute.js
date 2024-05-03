const jwt=require("jsonwebtoken");
const User = require("../models/usermodel");

const protectRoute=async (req,res,next)=>{
    try{
       // console.log(req.cookies.jwt)
        const token=req.body.token;
        if(!token){
            return res.status(401).json({error:"Unauthorized - No Token Provided"})
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({error:"Unauthorized - Invalid Token"})
        }

        const user=await User.findById(decoded.userId).select("-password")
        if(!user){
            return res.status(404).json({error:"User not found"})
        }

        req.user=user

        next()

    }catch(err){
        console.log("Error in protectRoute middleware",err.message);
        res.status(401).json({error:"Internal server error"})
    }
    
}


module.exports={protectRoute}