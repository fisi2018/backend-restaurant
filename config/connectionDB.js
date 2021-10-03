const mongoose=require("mongoose");
require("dotenv").config();
const connectionDB=async()=>{
    try{
        const URL_DATABASE=process.env.DATABASE;
        await mongoose.connect(URL_DATABASE,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("CONECTADO A LA DB");
    }catch(err){
        console.log("ERROR AL CONECTARSE A LA DB ",err);
    }
}
module.exports={connectionDB};