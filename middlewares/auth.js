const { verifyToken } = require("../helpers/generateToken");

const checkAuth=async(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ").pop();
        const tokenData= await verifyToken(token);
        tokenData._id?
        next()
        :res.status(409).send({message:"No tiene acceso a esta información",
    error:true});
    }catch(err){
        res.status(409).send({
            message:"No tiene acceso a esta información",
            error:true
        })
    }
}
module.exports=checkAuth