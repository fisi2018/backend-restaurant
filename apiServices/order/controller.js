const { httpError } = require("../../helpers/handleError");
const { listElements, createOrder, createOrderAdmin, orderById, updateOrder, removeOrder, listElementsPromo } = require("../../services/serviceOrder");
exports.list=async(req,res)=>{
    try{
        let order=req.query.order?req.query.order:"asc",
        sortBy=req.query.sortBy?req.query.sortBy:"name";
        const response=await listElements(order,sortBy);
        res.send(response);
    }catch(err){
        httpError(res,err);
    }
}
exports.create=async(req,res)=>{
    try{
        let {entrada=0,plato=0,bebida=0,postre=0,user,address,phone=0}=req.body;
        const response=await createOrder(entrada,plato,bebida,postre,user,address,phone);
        if(!response.error){
            res.send({
                message:"Orden creada exitosamente"
            });
        }else{
            res.send({
                message:response.message,
                error:response.error
            })
        }
    }catch(err){
        httpError(res,err);
    }
}
exports.update=async(req,res)=>{
    try {
        const id=req.order._id;
        const response=await updateOrder(id,req);
        res.send(response);
    } catch (err) {
        httpError(res,err);
    }
}
exports.remove=async(req,res)=>{
    try {
        const response=await removeOrder(req);
        res.send(response);
    } catch (err) {
        httpError(res,err);
    }
}
exports.orderById=async(req,res,next,id)=>{
    try {
        const response=await orderById(id,res);
        req.order=response;
        next();
    } catch (err) {
        httpError(res,err)
    }
}
exports.createAdmin=async(req,res)=>{
    try {
        const response=await createOrderAdmin(req);
        res.send(response);
    } catch (err) {
        httpError(res,err);
    }
}
exports.listPromo=async(req,res)=>{
    try{
        const response=await listElementsPromo();
        res.send(response);
    }catch(err){
        httpError(res,err);
    }
}