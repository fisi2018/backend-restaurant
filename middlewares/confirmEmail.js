const CodeModel=require("../apiServices/code/model");
const { verifyToken } = require("../helpers/generateToken");
const confirmEmail=async(req,res,next)=>{
    try{
       
        const token=req.headers.authorization.split(" ").pop();
        const tokenData= await verifyToken(token);
        const response=await CodeModel.findOne({code:tokenData.code,email:tokenData.email});
        if(response){
            response.remove();
            next();
        }else{
            res.status(409).send({message:"Código inválido"});
        }
    }catch(err){
        res.status(409).send({
            message:"Código inválido"
        })
    }
}
module.exports=confirmEmail