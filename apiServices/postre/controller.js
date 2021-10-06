const { httpError } = require("../../helpers/handleError")
const { listElements,createElement, elementById, removeElement, updateElement, elementImg } = require("../../services/services")
const PostreModel=require("./model");
exports.list=async(req,res)=>{
    try{
        const response=await listElements(PostreModel,req);
        res.send(response);
    }catch(err){
        httpError(res,err)
    }
}
exports.create=async(req,res)=>{
    try{
        const response=await createElement(PostreModel,req);
        res.send(response);
    }catch(err){
        httpError(res,err);
    }
}
exports.remove=async(req,res)=>{
    try {
        const data=req.postre.entradaFull;
        const response=await removeElement(data);
        res.send(response);
    } catch (err) {
        httpError(res,err);
    }
}
exports.update=async(req,res)=>{
    try {
        const id=req.postre.entradaFull._id;
        const response=await updateElement(PostreModel,id,req);
        res.send(response);
    } catch (err) {
        httpError(res,err);
    }
}
exports.img=(req,res,next)=>{
    const arg=req.postre.entradaFull;
    elementImg(arg,(type,data)=>{
        res.set("Content-Type",type);
        return res.send(data);
    });
    next();
}
exports.postreById=async(req,res,next,id)=>{
    try{
        const response=await elementById(PostreModel,id,res);
        req.postre=response;
        next();
    }catch(err){
        httpError(res,err);
    }
}