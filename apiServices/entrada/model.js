const mongoose=require("mongoose");
const entradaSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            trim:true,
            required:true,
            maxlength:32
        },
        description:{
            type:String,
            trim:true,
            required:true
        },
        price:{
            type:Number,
            trim:true,
            required:true
        },
        img:{
            data:Buffer,
            contentType:String
        }
    },
    {
        timestamps:true,
        versionKey:false
    }
);
module.exports=mongoose.model("EntradaModel",entradaSchema);