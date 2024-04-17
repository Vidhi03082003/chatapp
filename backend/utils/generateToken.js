const jwt=require("jsonwebtoken")

const generateTokenAndSetCookie=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'15d'
    })

    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000,
        httpOnly:true,   // By setting httpOnly to true, you ensure that the cookie containing the JWT token cannot be accessed by JavaScript running on the client side. This helps mitigate certain types of attacks where malicious scripts attempt to steal cookies containing sensitive information.
        sameSite:"strict" , // When sameSite is set to "Strict", the cookie will only be sent in a first-party context. This means the cookie will not be sent with cross-origin requests.
        
    })
}

module.exports={generateTokenAndSetCookie}