const { httpError } = require("../../helpers/handleError");
const { listElements,createElement, elementById, removeElement, updateElement, elementImg } = require("../../services/services");
const BebidaModel=require("./model");
exports.list=async(req,res)=>{
    try{
        const response= await listElements(BebidaModel,req);
        res.send(response);
    }catch(err){
        httpError(res,err);
    }
}
exports.create=async(req,res)=>{
    try{
        const response=await createElement(BebidaModel,req);
        res.send(response);
    }catch(err){
        httpError(res,err);
    }
}
exports.remove=async(req,res)=>{
    try{
        const data=req.bebida.entradaFull;
        const response=await removeElement(data);
        res.send(response);
    }catch(err){
        httpError(res,err);
    }
}
exports.update=async(req,res)=>{
    try{
        const id=req.bebida.entradaFull;
        const response=await updateElement(BebidaModel,id,req);
        res.send(response);
    }catch(err){
        httpError(res,err);
    }
}
exports.img=(req,res,next)=>{
    const arg=req.bebida.entradaFull;
    elementImg(arg,(type,data)=>{
        res.set("Content-Type",type);
        return res.send(data);
    });
    next();
}
exports.bebidaById=async(req,res,next,id)=>{
    try{
        const response=await elementById(BebidaModel,id,res);
        req.bebida=response;
        next();
    }catch(err){
        httpError(res,err)
    }
}