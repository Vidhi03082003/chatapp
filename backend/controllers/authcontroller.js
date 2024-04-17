const User=require("../models/usermodel")
const bcrypt = require("bcryptjs");
const { generateTokenAndSetCookie } = require("../utils/generateToken");

const signup=async (req,res)=>{
    try{
        const {fullName,username,password,confirmPassword,gender}=req.body;
        if(password!=confirmPassword){
            return res.status(400).json({error:"Passwords don't match"})
        }

        const user=await User.findOne({username});

        if(user){
            return res.status(400).json({error:"Username already exists"})
        }

        // hash password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        // creating avatars
        // https://avatar-placeholder.iran.liara.run/
        const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser=new User({
            fullName,username,password:hashedPassword,confirmPassword,gender,
            profilePic:gender==="male"?boyProfilePic:girlProfilePic
        })

        if(newUser){
            generateTokenAndSetCookie(newUser._id,res)
            await newUser.save()

            

            return res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            username:newUser.username,
            profilePic:newUser.profilePic
        })
        }
        else{
            res.status(400).json({error:"Invalid User data"})
        }
    }catch(err){
        console.log("Error in signup controller",err.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}

const login=async (req,res)=>{
    try{
        const {username,password}=req.body;
        const user=await User.findOne({username});
        const isPasswordCorrect=await bcrypt.compare(password,user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid username or password"})
        }

        generateTokenAndSetCookie(user._id,res);

        res.status(201).json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            profilePic:user.profilePic
        })
    }catch(err){
        console.log("Error in login controller",err.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}

const logout=(req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged out successfully"})
    }catch(err){
        console.log("Error in logout controller",err.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}


module.exports = {signup,login,logout};