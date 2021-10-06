const OrdenModel=require("../apiServices/order/model");
const util=require("util");
const listOrderDB=async(order,sortBy)=>{
    try{
        const response=await OrdenModel.find().populate("user","name points").populate("entrada","name price points").populate("bebida","name price points").populate("plato","name price points").populate("postre","name price points").sort([[sortBy,order]]);
        return response;
    }catch(err){
        console.log("Error en la capa de datos ",err);
    }
}
const createOrderDB=async(fields)=>{
    try {
        let newFields={};
        for(let data in fields){
            if(fields[data]!==0)
            newFields={...newFields,[data]:fields[data]}
        }
       
        const response=new OrdenModel(newFields);
        const save=util.promisify(response.save).bind(response);
        const result=await save();
        return result
    } catch (err) {
        console.log("Error en la capa de datos ",err);
    }
}
const showOrderDB=async(id)=>{
    try{
        const response=await OrdenModel.findById(id).populate("entrada","price points").populate("bebida","price points").populate("postre","price points").populate("plato","price points");
        return response;
    }catch(err){
        console.log("Error en la capa de datos ",err);
    }
}
const updateOrderDB=async(id,data)=>{
    try {
        const response=await OrdenModel.findByIdAndUpdate(id,data,{new:true});
        return response;
    } catch (err) {
        console.log("Error en la capa de datos ",err);
    }
}
const orderByIdDB=async(id)=>{
    try {
        const response=await OrdenModel.findById(id);
        return response;
    } catch (err) {
        console.log("Error en la capa de datos ",err);
    }
}
const removeOrderDB=async(data)=>{
    try{
        await data.remove();
        return{
            message:"Orden removida exitosamente"
        }
    }catch(err){
        console.log("Error en la capa de datos ",err);
    }
}
module.exports={removeOrderDB,listOrderDB,createOrderDB,showOrderDB,updateOrderDB,orderByIdDB}