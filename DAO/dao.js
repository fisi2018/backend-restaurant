const fs=require("fs");
const util=require("util");
const createElementDB=async(Model,fields,files)=>{
    try{
        let element=Model(fields);
        if(files.img){
            if(files.img.size>1000000) return response.status(400).send({message:"La imagen debe ser menor de 1GB"});
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
        console.log(email);
        const user=await Model.findOne({email});
        return user;
    }catch(err){
        console.log("Error en la capa de datos ",err)
    }
}
module.exports={findOneDB,updateElementDB,createElementDB,listDB,elementByIdDB,removeElementDB}