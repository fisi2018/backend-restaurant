const { httpError } = require("../../helpers/handleError");
const { listElements, elementById, removeElement, updateElement, elementImg, generateCode, clearCodes } = require("../../services/services");
const {registerService} = require("../../services/registerService");
const UserModel=require("./model");
const CodeModel=require("../code/model");
const loginService = require("../../services/loginService");

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
exports.login=async(req,res)=>{
    try{
        
        const response=await loginService(UserModel,req,res);
        res.send(response);
    }catch(err){
        httpError(res,err);
    }
}
exports.update=async(req,res)=>{
    try {
        const id=req.user.entradaFull._id;
        const response=await updateElement(UserModel,id,req);
        res.send(response);
    } catch (err) {
        httpError(res,err);
    }
}
exports.userById=async(req,res,next,id)=>{
    try{
        const response=await elementById(UserModel,id,res);
        req.user=response;
        next();
    }catch(err){
        httpError(res,err);
    }
}
exports.remove=async(req,res)=>{
    try {
        const data=req.user.entradaFull;
        const response=await removeElement(data);
        res.send(response);
    } catch (err) {
        httpError(res,err);
    }
}
exports.img=(req,res,next)=>{
    const arg=req.user.entradaFull;
    elementImg(arg,(type,data)=>{
        res.set("Content-Type",type);
        return res.send(data);
    });
    next()
}
exports.generateCode=async(req,res)=>{
    try {
        const data=req.body;
        const result=await clearCodes();
        if(result.error)return res.send({
            message:result.message,
            error:result.error
        })
        const response=await generateCode(CodeModel,data);
        res.send(response);
    } catch (err) {
        httpError(res,err);
    }
}