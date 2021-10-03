const {connectionDB}=require("./config/connectionDB");
const app=require("./app");
require("dotenv").config();
const PORT=process.env.PORT || 4000;
app.listen(PORT,async()=>{
    connectionDB();
    console.log("INICIANDO DESDEE EL PUERTO ",PORT);
});
