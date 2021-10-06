const jwt=require("jsonwebtoken");
const tokenSign=async(user)=>{
    return jwt.sign({
        _id:user._id,
        name:user.name,
        role:user.role,
        points:user.points
    },
    process.env.JWT_SECRET,
    {
        expiresIn:"2h"
    })
}
const verifyToken=async(token)=>{
    try{
        return jwt.verify(token,process.env.JWT_SECRET);
    }catch(err){
        return null
    }
}
const decodeSign=()=>{

}

module.exports={tokenSign,verifyToken,decodeSign}