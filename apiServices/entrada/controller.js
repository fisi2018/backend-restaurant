const {listElements, updateElement,elementById,elementImg,createElement,removeElement}=require("../../services/services");
const {httpError}=require("../../helpers/handleError");
const EntradaModel=require("./model");
exports.list=async(req,res)=>{
    try{
        const response=await listElements(EntradaModel,req);
        res.send(response);
        
    }catch(err){
        httpError(res,err);
    }
}
exports.create=async(req,res)=>{
    try{
        const response=await createElement(EntradaModel,req);
        res.send(response);
    }catch(err){
        httpError(res,err);
    }
}
exports.remove=async(req,res)=>{
    try{
        const data=req.entrada.entradaFull;
        const response=await removeElement(data);
        res.send(response);
    }catch(err){
        httpError(res,err);
    }
}
exports.update=async(req,res)=>{
    try{
        const id=req.entrada.entradaFull._id;
        const response=await updateElement(EntradaModel,id,req);
         res.send(response);
        
    }catch(err){
        httpError(res,err);
    }
}
exports.entradaById=async(req,res,next,id)=>{
    try{
        const response=await elementById(EntradaModel,id,res);
        req.entrada=response;
        next();
    }catch(err){
        httpError(res,err);
    }
}
exports.imgEntrada=(req,res,next)=>{
    const arg=req.entrada.entradaFull;
    elementImg(arg,(type,data)=>{
        res.set("Content-Type",type);
        return res.send(data);
    })
    next();
}