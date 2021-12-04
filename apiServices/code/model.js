const mongoose=require("mongoose");
const codeSchema=new mongoose.Schema({
    code:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true
    },
    token:{
        type:String,
        trim:true,
        required:true
    }
},{
    timestamps:true,
    versionKey:false
});
module.exports=mongoose.model("CodeModel",codeSchema)