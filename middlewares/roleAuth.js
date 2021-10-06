const { verifyToken } = require("../helpers/generateToken");
const UserModel=require("../apiServices/user/model");
const checkRoleAuth=(roles)=>async(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ").pop();
        const tokenData=await verifyToken(token);
        const user=await UserModel.findById(tokenData._id);
        [].concat(roles).includes(user.role)?next():
        res.status(409).send({
            message:"No tiene permisos para realizar esta acción"
        })
    }catch(err){
        res.status(409).send({
            message:"No tiene permisos para realizar esta acción"
        })
    }
}
module.exports=checkRoleAuth