const { httpError } = require("../../helpers/handleError");
const { listElements } = require("../../services/services");
const registerService = require("../../services/registerService");
const UserModel=require("./model");

exports.list=async(req,res)=>{
    try{
        const response= await listElements(UserModel,req);
        res.send(response);
    }catch(err){
        httpError(res,err);
    }
}
exports.register=async(req,res)=>{
    try{
        const response= await registerService(req);
        res.send(response);
    }catch(err){
        httpError(res,err);
    }
}
exports.login=()=>{

}
exports.update=()=>{

}
exports.userById=()=>{

}
exports.remove=()=>{

}