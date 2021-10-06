const { httpError } = require("../../helpers/handleError");
const { listElements, createOrder, createOrderAdmin, orderById, updateOrder, removeOrder } = require("../../services/serviceOrder");
exports.list=async(req,res)=>{
    try{
        const response=await listElements(req);
        res.send(response);
    }catch(err){
        httpError(res,err);
    }
}
exports.create=async(req,res)=>{
    try{
        const response=await createOrder(req);
        res.send(response);
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