const jwt=require("jsonwebtoken");
const tokenSign=async(user)=>{
    return jwt.sign({
        _id:user._id,
        name:user.name,
        role:user.role,
        email:user.email,
        points:user.points,
        img:user.img?true:false
    },
    process.env.JWT_SECRET,
    {
        expiresIn:"2h"
    })
}
const tokenCodeSign=async(data)=>{
    return jwt.sign({
        code:data.code,
        email:data.email
    },process.env.JWT_SECRET,
    {
        expiresIn:"3min"
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

module.exports={tokenSign,verifyToken,decodeSign,tokenCodeSign}