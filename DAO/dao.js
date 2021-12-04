const fs=require("fs");
const util=require("util");
const CodeModel=require("../apiServices/code/model");
const { verifyToken } = require("../helpers/generateToken");
const createElementDB=async(Model,fields,files)=>{
    try{
        let element=Model(fields);
        if(files.img){
            if(files.img.size>1000000) return{message:"La imagen debe ser menor de 1GB"};
                element.img.data=fs.readFileSync(files.img.path);
                element.img.contentType=files.img.type;
                
        }
        const save=util.promisify(element.save).bind(element);
        const result=await save(element);
        return result
    }catch(err){
        console.log("ERROR EN LA CAPA DE DATOS ",err);
    }
}
const listDB=async(Model,order,sortBy)=>{
    try{
        const response=Model.find().select("-img").sort([[sortBy,order]]);
        return response;
    }catch(err){
        console.log("ERROR EN LA CAPA DE DATOS ",err);
    }
}
const elementByIdDB=async(Model,id)=>{
    try{
        const response=await Model.findById(id);
        return response
    }catch(err){
        console.log("ERROR EN LA CAPA DE DATOS ",err)
    }
}
const removeElementDB=async(data)=>{
    try{
        await data.remove();
        return {
            message:"Elemento borrado exitosamente"
        }
    }catch(err){
        console.log("Error en la capa de datos ",err);
    }
}
const updateElementDB=async(Model,id,fields,files)=>{
    try{
        let img={
            data:"",
            contentType:""
        }
        if(files.img){
            if(files.img.size>1000000) return response.status(400).send({message:"La imagen debe ser menor de 1GB"});
                img.data=fs.readFileSync(files.img.path);
                img.contentType=files.img.type;
        }
        let datos={...fields,img};
        const response=await Model.findByIdAndUpdate(id,datos,{new:true});
        return{
            message:`Se ha actualizado el elemento ${response.name}`
        }
    }catch(err){
        console.log("ERROR EN LA CAPA DE DATOS ",err);
    }
}
const findOneDB=async(Model,email)=>{
    try{
        const user=await Model.findOne({email});
        return user;
    }catch(err){
        console.log("Error en la capa de datos ",err)
    }
}
const saveCodeDB=async(Model,data)=>{
    try{
        const response=new Model(data);
        const save=util.promisify(response.save).bind(response);
        const result=await save();
        return result
    }catch(err){
        console.log("Error en la capa de datos ",err);
    }
}
const deleteCodeDB=async(Model,data)=>{
    try{
        const response=await Model.findOne({code:data.code,email:data.email});
        await response.remove();
    }catch(err){
        console.log("Error en la capa de datos ",err);
    }
}
const validateCodeDB=async(code,email)=>{
    try{
        const result=await CodeModel.findOne({code,email});
        const data=await verifyToken(result.token);
        if(!data)return{message:"El codigo ha expirado",error:true}
        return result;
    }catch(err){
        return{
            message:"Ha ocurrido un error en la capa de datos",
            error:err
        }
    }
}
const clearCodesDB=async()=>{
    try{
        const codes=await CodeModel.find().select("token");
        codes.forEach(async(el)=>{
            const response=await verifyToken(el.token);
            if(!response) el.remove();
        });
        return{
            message:"Limpieza realizada correctamente"
        }
    }catch(err){
        return{
            message:"Ha ocurrido un error en la capa de datos",
            error:err
        }
    }
}
module.exports={clearCodesDB,validateCodeDB,deleteCodeDB,findOneDB,updateElementDB,createElementDB,listDB,elementByIdDB,removeElementDB,saveCodeDB}