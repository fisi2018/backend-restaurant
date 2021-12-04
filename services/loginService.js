const { findOneDB } = require("../DAO/dao");
const { tokenSign } = require("../helpers/generateToken");
const {compare}=require("../helpers/handleBcrypt");

const loginService=async(Model,req,res)=>{
    try{
        const {email,password}= req.body;
        const response= await findOneDB(Model,email);
        if(!response) res.status(404).send({message:"Usuario no encontrado"});
        const checkPassword=await compare(password,response.password);
        if(checkPassword){
            const data={name:response.name,
                    _id:response._id,
                    email:response.email,
                    points:response.points,
                    role:response.role};
            const tokenSesion=await tokenSign(data);
            return{
                data,
                tokenSesion
            }
        }else{
            return{
                message:"Password incorrecto"
            }
        }

    }catch(err){
        console.log("Error en la capa de servicios ",err)
    }
}
module.exports=loginService;