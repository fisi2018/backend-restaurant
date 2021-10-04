const formidable=require("formidable");
const util=require("util");
const {updateElementDB, listDB,createElementDB,elementByIdDB,removeElementDB} = require("../DAO/dao");
const listElements=async(Model,req)=>{
    try{
        let order=req.query.order?req.query.order:"asc",
        sortBy=req.query.sortBy?req.query.sortBy:"name";
        const response=await listDB(Model,order,sortBy);
        return response;
    }catch(err){
        console.log("Error en la capa de servicios ",err);
    }
}

const elementById=async(Model,id)=>{
    try{
        const entrada= await elementByIdDB(Model,id);
        if(!entrada) return{message:"No existe una entrada con ese ID"};
        return {entradaFull:entrada}
    }catch(err){
        console.log("ERROR EN LA CAPA DE SERVICIOS ",err)
    }
}
const elementImg=(req,cb)=>{
    if(req.img.data){
        const set=req.img.contentType,
        send=req.img.data;
        cb(set,send);
    }
}
const createElement=async(Model,req)=>{
    try{
        let form=new formidable.IncomingForm();
        form.keepExtensions=true;
        const parse=util.promisify((req,cb)=>{form.parse(req,(err,fields,files)=>cb(err,{fields,files}))}).bind(form);
        const {fields,files}=await parse(req);
        const response=await createElementDB(Model,fields,files);
        return response;
    }catch(err){
        console.log("ERROR EN LA CAPA DE SERVICIOS ", err);
    }
}
const removeElement=async(data)=>{
    try{
        const response=await removeElementDB(data);
        return response;
    }catch(err){
        console.log("ERROR EN LA CAPA DE SERVICIOS ",err);
    }
}
const updateElement=async(Model,id,req)=>{
    try{
        let form=new formidable.IncomingForm();
        form.keepExtensions=true;
        const parse=util.promisify((req,cb)=>{form.parse(req,(err,fields,files)=>cb(err,{fields,files}))}).bind(form);
        let {fields,files}=await parse(req);
        const response=await updateElementDB(Model,id,fields,files);
        return response;

    }catch(err){
        console.log("ERROR EN LA CAPA DE SERVICIOS ",err);
    }
}
module.exports={updateElement,removeElement,elementById,elementImg,createElement,listElements}