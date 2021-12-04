const {connectionDB}=require("./config/connectionDB");
const app=require("./app");
const http=require("http");
const server=http.createServer(app);
const {Server}=require("socket.io");
const {listElements, listElementsByUser}=require("./services/serviceOrder");
const io=new Server(server,{
    cors:{
        origin:"*"
    }
});
io.on("connection",(socket)=>{
    console.log("conectando a socket");
    socket.on("testing socket",async(id)=>{
        const response=await listElementsByUser("asc","name",id)
        io.emit("testing socket",response);
    });

});
require("dotenv").config();
const PORT=process.env.PORT || 4000;

server.listen(PORT,async()=>{
    connectionDB();
    console.log("INICIANDO DESDE EL PUERTO ",PORT);
});