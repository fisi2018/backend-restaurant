const { listOrderDB, createOrderDB,showOrderDB,updateOrderDB, orderByIdDB, removeOrderDB} = require("../DAO/daoOrder");

const listElements=async(req)=>{
    try{
        let order=req.query.order?req.query.order:"asc",
        sortBy=req.query.sortBy?req.query.sortBy:"name";
        const response= await listOrderDB(order,sortBy);
        return response
    }catch(err){
        console.log("Error en la capa de servicios ",err);
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
const createOrder=async(req)=>{
    try {
        let {entrada=0,plato=0,bebida=0,postre=0,user}=req.body;

        const response=await createOrderDB({entrada,plato,bebida,postre,user});
        const orderWithPrice=await calcPriceAndPoints(response);
        return orderWithPrice
    } catch (err) {
        console.log("Error ocurrido en la capa de servicios ",err);
    }
}
const calcPriceAndPoints=async(order)=>{
    try{
        const id=order._id;
        const orderWithPopulate=await showOrderDB(id);
        console.log(orderWithPopulate);
        console.log(orderWithPopulate.entrada?"SI HAY ENTRADA":"No hay entrada");
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
module.exports={removeOrder,listElements,createOrder,createOrderAdmin,orderById,updateOrder}