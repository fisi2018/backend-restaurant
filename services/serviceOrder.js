const { listOrderDB, createOrderDB,showOrderDB,updateOrderDB, orderByIdDB, removeOrderDB, listOrderByUserDB, listPromoDB} = require("../DAO/daoOrder");

const listElements=async(order,sortBy)=>{
    try{
        const response= await listOrderDB(order,sortBy);
        return response;
    }catch(err){
        console.log("Error en la capa de servicios ",err);
    }
}
const listElementsPromo=async()=>{
    try{
        const response=await listPromoDB();
        if(response.error)return{message:response.message,error:response.error}
        return response;
    }catch(err){
        console.log("Error encontrado en la capa de servicios");
        return{
            message:"Ha ocurrido un error en la capa de servicios",
            error:err
        }
    }
}
const listElementsByUser=async(order,sortBy,idUser)=>{
    try{
        const response=await listOrderByUserDB(order,sortBy,idUser);
        return response;
    }catch(err){
        return{
            message:"Ha ourrido un error en la capa de servicios",
            error:err
        }
    }
}
const createOrderAdmin=async(req)=>{
    try {
        const fields=req.body;
        const response=await createOrderDB(fields);
        return response
    } catch (err) {
        console.log("Error en la capa de servicios ",err);
    }
}
const createOrder=async(entrada,plato,bebida,postre,user,address,phone)=>{
    try {
        const response=await createOrderDB({entrada,plato,bebida,postre,user,address,phone});
        const orderWithPrice=await calcPriceAndPoints(response);
        return orderWithPrice
    } catch (err) {
        return{
            error:err,
            message:"Ha ocurrido un error en la capa de servicios"
        }
    }
}
const calcPriceAndPoints=async(order)=>{
    try{
        const id=order._id;
        const orderWithPopulate=await showOrderDB(id);
        
        const price=(orderWithPopulate.entrada?orderWithPopulate.entrada.price:0)+(orderWithPopulate.bebida?orderWithPopulate.bebida.price:0)+(orderWithPopulate.plato?orderWithPopulate.plato.price:0)+(orderWithPopulate.postre?orderWithPopulate.postre.price:0);
        const points=(orderWithPopulate.entrada?orderWithPopulate.entrada.points:0)+(orderWithPopulate.bebida?orderWithPopulate.bebida.points:0)+(orderWithPopulate.plato?orderWithPopulate.plato.points:0)+(orderWithPopulate.postre?orderWithPopulate.postre.points:0);
        let data={
            price,
            points
        };
        const response=await updateOrderDB(id,data);
        return response;
    }catch(err){
        console.log("Error en la capa de servicios ",err);
    }
}
const orderById=async(id,res)=>{
    try {
        const response=await orderByIdDB(id);
        if(!response) return res.send({message:"No existe una orden con ese ID"})
        return response
    } catch (err) {
        console.log("Error en la capa de servicios ",err)
    }
}
const updateOrder=async(id,req)=>{
    try {
        const data=req.order;
        const response=await updateOrderDB(id,data);
        return response;
    } catch (err) {
        console.log("Error en la capa de servicios ",err);
    }
}
const removeOrder=async(req)=>{
    try{
        const data=req.order;
        const response=await removeOrderDB(data);
        return response;
    }catch(err){
        console.log("Error en la capa de servicios ",err);
    }
}
module.exports={listElementsPromo,removeOrder,listElementsByUser,listElements,createOrder,createOrderAdmin,orderById,updateOrder}