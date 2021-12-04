const formidable = require("formidable");
const { encrypt } = require("../helpers/handleBcrypt");
const {createElementDB, validateCodeDB}=require("../DAO/dao");
const UserModel=require("../apiServices/user/model");
const util=require("util");

const registerService=async(req)=>{
    try{
        
        let form= new formidable.IncomingForm();
        form.keepExtensions=true;
        const parse=util.promisify((req,cb)=>{form.parse(req,(err,fields,files)=>cb(err,{fields,files}))}).bind(form);
        let {fields,files}=await parse(req);
        let {name,email,password,code}=fields;
        const result=await validateCode(code,email);
        if(!result)return{message:"Código inválido",error:true}
        const passHash=await encrypt(password);
        fields={...fields,password:passHash};
        const response=await createElementDB(UserModel,fields,files);
        return response;
    }catch(err){
        console.log("Error en la capa de servicio ",err);
        return{
            message:"Error ocurrido en la capa de servicios",
            error:err
        }
    }
}
const validateCode=async(code,email)=>{
    try{
        const response=await validateCodeDB(code,email);
        if(response.error || !response)return false;
        return true;
    }catch(err){
        return{
            message:"Error ocurrido en la capa de servicios",
            error:err
        }
    }
}
module.exports={registerService}