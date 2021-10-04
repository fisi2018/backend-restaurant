const formidable = require("formidable");
const { encrypt } = require("../helpers/handleBcrypt");
const {createElement}=require("../DAO/dao");
const UserModel=require("../apiServices/user/model");
const util=require("util");

const registerService=async(req)=>{
    try{
        let form= new formidable.IncomingForm();
        form.keepExtensions=true;
        const parse=util.promisify((req,cb)=>{form.parse(req,(err,fields,files)=>cb(err,{fields,files}))}).bind(form);
        let {fields,files}=await parse(req);
        let {name,email,password}=fields;
        const passHash=await encrypt(password);
        fields={...fields,password:passHash};
        const response=await createElement(UserModel,fields,files);
        return response;
    }catch(err){
        console.log("Error en la capa de servicio ",err);
    }
}
module.exports=registerService