const { httpError } = require("../../helpers/handleError");
const { listElements, createElement, removeElement, elementById, updateElement, elementImg } = require("../../services/services");
const PlatoModel=require("./model");

exports.list=async(req,res)=>{
    try{
        const response= await listElements(PlatoModel,req);
        res.send(response);
    }catch(err){
        httpError(res,err);
    }
}
exports.create=async(req,res)=>{
    try{
        const response=await createElement(PlatoModel,req);
        res.send(response);
    }catch(err){
        httpError(res,err);
    }
}
exports.update=async(req,res)=>{
    try{
        const id=req.plato.entradaFull._id;
        const response=await updateElement(PlatoModel,id,req);
        res.send(response);
    }catch(err){
        httpError(res,err);
    }
}
exports.remove=async(req,res)=>{
    try{
        const data=req.plato.entradaFull;
        const response=await removeElement(data);
        res.send(response);
    }catch(err){
        httpError(res,err);
    }
}
exports.img=(req,res,next)=>{
    const arg=req.plato.entradaFull;
    elementImg(arg,(type,data)=>{
        res.set("Content-Type",type);
        return res.send(data);
    });
    next();
}
exports.platoById=async(req,res,next,id)=>{
    try{
        const response=await elementById(PlatoModel,id,res);
        req.plato=response;
        next();
    }catch(err){
        httpError(res,err);
    }
}