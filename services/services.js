const formidable=require("formidable");
const util=require("util");
const transporter = require("../config/mailer");
const {updateElementDB, listDB,createElementDB,elementByIdDB,removeElementDB, saveCodeDB, deleteCodeDB, clearCodesDB} = require("../DAO/dao");
const {tokenCodeSign } = require("../helpers/generateToken");
const { generateCodeNumber } = require("../utils");
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

const elementById=async(Model,id,res)=>{
    try{
        const entrada= await elementByIdDB(Model,id);
        if(!entrada) return res.status(400).send({message:"No eexiste un elemento con ese ID"});
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
const generateCode=async(Model,data)=>{
    try{
        const codeEmail=generateCodeNumber(6);
        const token=await tokenCodeSign({
            code:codeEmail,
            email:data.email
        });
        const result=await saveCodeDB(Model,{code:codeEmail,email:data.email,token});
        let info = await transporter.sendMail({
        from: '"Envío de código" <mensajerop7@gmail.com>', // sender address
        to: data.email, // list of receivers
        subject: "Código de verificación", // Subject line
        html: `<b>Código de verificación solicitado para el registro</b>
        <br/> 
        <p>El código expirará en 3 minutos</p>
         <br/>
         <h1>${codeEmail}</h1>`, 
        });
        
        return{
            result,
            token
        }
    }catch(err){
        console.log("Error en la capa de servicio ",err);
    }
}
const deleteCode=async(Model,data)=>{
    try{
        await deleteCodeDB(Model,data);
    }catch(err){
        console.log("Error en la capa de servicios ",err);
    }
}
const clearCodes=async()=>{
    try{
        const response=await clearCodesDB();
        return response;
    }catch(err){
        return{
            message:"Ha ocurrido un error en la capa de servicios",
            error:err
        }
    }
}
module.exports={clearCodes,deleteCode,generateCode,updateElement,removeElement,elementById,elementImg,createElement,listElements}